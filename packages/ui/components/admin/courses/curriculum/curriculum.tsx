import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useMutation } from "urql";
import { Button } from "ui/components/button";
import { TopicContentProvider } from "ui/context/topic-content-context";
import {
  CreateTopicDocument,
  DeleteTopicDocument,
  UpdateTopicDocument,
} from "gql-generated/gql/graphql";
import type {
  CreateTopicInput,
  CreateTopicMutation,
  CreateTopicMutationVariables,
  DeleteTopicMutation,
  DeleteTopicMutationVariables,
  Topic as TopicType,
  UpdateTopicMutation,
  UpdateTopicMutationVariables,
} from "gql-generated/generated/types";
import { usePersistedState } from "../../../../hooks/use-persisted-state";
import { Topic } from "./topic";
import { UpsertTopicDialog } from "./upsert-topic-dialog";

interface CurriculumProps {
  initialTopicsData?: TopicType[];
  courseId: string;
}

export function Curriculum({
  initialTopicsData,
  courseId,
}: CurriculumProps): ReactNode {
  const [topics, setTopics] = useState<TopicType[]>(initialTopicsData || []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TopicType | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [, deleteTopicMutation] = useMutation<
    DeleteTopicMutation,
    DeleteTopicMutationVariables
  >(DeleteTopicDocument);
  const [{ data: createdTopic }, createTopicMutation] = useMutation<
    CreateTopicMutation,
    CreateTopicMutationVariables
  >(CreateTopicDocument);
  const [, updateTopicMutation] = useMutation<
    UpdateTopicMutation,
    UpdateTopicMutationVariables
  >(UpdateTopicDocument);

  const [collapsedTopics, setCollapsedTopics] = usePersistedState<string[]>(
    `collapsed-topics-${courseId}`,
    []
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = topics.findIndex((item) => item.id === active.id);
      const newIndex = topics.findIndex((item) => item.id === over.id);

      const newTopics = arrayMove(topics, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index + 1,
        })
      );

      setTopics(newTopics);

      const updatePromises = newTopics.map((item) =>
        updateTopicMutation({
          topicId: item.id,
          input: { position: item.position },
        })
      );

      const responses = await Promise.all(updatePromises);

      if (responses.every((response) => response.data)) {
        toast.success("Topics reorganizados correctamente.");
      } else {
        toast.error("Hubo un error al reorganizar los topics.");
      }
    }

    setActiveId(null);
  };

  const handleCreateTopic = async (data: {
    title: string;
    description: string;
  }) => {
    try {
      setIsSaving(true);
      const newTopic: CreateTopicInput = {
        courseID: courseId,
        ...data,
        position: topics.length + 1,
      };

      const response = await createTopicMutation({ input: newTopic });

      if (!response.data && response.error?.message) {
        toast.error("Ups sucedio un problema al crear el topic", {
          description: "Intentalo de nuevo mas tarde.",
          richColors: true,
        });
        setIsSaving(false);
        return;
      }

      // Make sure topic is fully created before updating state
      if (response.data?.createTopic) {
        const createdTopicId = response.data?.createTopic.id;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        setTopics([...topics, { ...newTopic, id: createdTopicId }] as any);
        setCollapsedTopics([...collapsedTopics, createdTopicId]);
        toast.success("Topic creado", {
          description: "Tu nuevo topic a sido creado satisfactoriamente.",
        });
      }

      setIsDialogOpen(false);
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      console.error("Algo sucedio mal: ", error);
      toast.error("Algo sucedio mal", {
        description: "Intentalo nuevamente",
      });
    }
  };

  const handleUpdateTopic = async (data: {
    title: string;
    description: string;
  }) => {
    if (!editingTopic) return;
    try {
      setIsSaving(true);
      const response = await updateTopicMutation({
        topicId: editingTopic.id,
        input: {
          ...data,
        },
      });

      if (response.data?.updateTopic) {
        setTopics(
          topics.map((topic) =>
            topic.id === editingTopic.id ? { ...topic, ...data } : topic
          )
        );
        setEditingTopic(null);
        toast.success("Topic actualizado", {
          description: "Tu nuevo topic a sido actualizado satisfactoriamente.",
        });
        setIsSaving(false);
      } else {
        toast.error("Algo sucedio al actualizar el topic", {
          description: "Intentalo nuevamente mas tarde,",
        });
        setIsSaving(false);
      }
    } catch (error) {
      toast.error("Algo sucedio al actualizar el topic", {
        description: error instanceof Error ? error.message : null,
      });
      console.error("Algo sucedio al actualizar el topic", error);
      setIsSaving(false);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    setSelectedTopic(
      topics.filter((topic) => topic.id === id).find((item) => Boolean(item)) ||
        null
    );
    const deleteTopicResult = await deleteTopicMutation({ topicId: id });
    if (deleteTopicResult) {
      const updatedTopics = topics
        .filter((topic) => topic.id !== id)
        .map((topic, index) => ({
          ...topic,
          position: index + 1,
        }));

      const updatePromises = updatedTopics.map((item) =>
        updateTopicMutation({
          topicId: item.id,
          input: { position: item.position },
        })
      );

      await Promise.all(updatePromises);

      setTopics(updatedTopics);
      toast.success("Topic borrado correctamente", {
        description: "Tu topic fue borrado satisfactoriamente.",
      });
    }
  };

  const handleCollapseToggle = (id: string) => {
    setCollapsedTopics((prev) =>
      prev.includes(id)
        ? prev.filter((topicId) => topicId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex bg-background mx-auto w-full max-w-full xl:max-w-[1006px] min-h-[calc(-64px+100vh)]">
      <div className="flex flex-col w-full items-start">
        <div className="pt-8 pb-6 self-start w-full">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild type="button" variant="ghost">
                <Link to={`/courses/${courseId}/builder`}>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <h1
                className="font-semibold text-gray-900 text-lg dark:text-gray-50"
                id="existing-users"
              >
                Curriculum
              </h1>
            </div>
            {topics.length > 0 ? (
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    if (collapsedTopics.length > 0) {
                      setCollapsedTopics([]);
                    } else {
                      setCollapsedTopics([...topics.map((item) => item.id)]);
                    }
                  }}
                  type="button"
                  variant="neutral"
                >
                  {collapsedTopics.length > 0
                    ? "Colapsar todos"
                    : "Expandir todos"}
                </Button>
                <Button
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                  type="button"
                >
                  Agregar topic
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        {topics.length === 0 ? (
          <div className="not-prose flex w-full items-center justify-center z-15 relative border-2 mb-5 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-border bg-secondary bg-[radial-gradient(#80808080_1px,transparent_1px)] px-10 py-20 shadow-shadow bg-size-[16px_16px] m750:px-5 m750:py-10">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-xl font-semibold">Sin topics creados aun</h2>
              <Button
                type="button"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                Crear topic
              </Button>
            </div>
          </div>
        ) : null}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          sensors={sensors}
        >
          <SortableContext
            items={topics}
            strategy={verticalListSortingStrategy}
          >
            {topics
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              .sort((itemA, itemB) => itemA.position! - itemB.position!)
              .map((topic) => (
                <TopicContentProvider topicId={topic.id} key={topic.id}>
                  <Topic
                    topic={topic}
                    {...topic}
                    isCollapsed={collapsedTopics.includes(topic.id)}
                    isTopicDragging={false}
                    onCollapseToggle={() => {
                      handleCollapseToggle(topic.id);
                    }}
                    onDelete={async () => {
                      await handleDeleteTopic(topic.id);
                    }}
                    onEdit={(id) => {
                      setEditingTopic(topics.find((t) => t.id === id) || null);
                    }}
                  />
                </TopicContentProvider>
              ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <TopicContentProvider
                topicId={
                  topics.find((topic) => topic.id === activeId)?.id || ""
                }
              >
                <Topic
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Required
                  // biome-ignore lint/style/noNonNullAssertion: <explanation>
                  {...topics.find((topic) => topic.id === activeId)!}
                  isTopicDragging
                  onDelete={handleDeleteTopic}
                  onEdit={() => {}}
                />
              </TopicContentProvider>
            ) : null}
          </DragOverlay>
        </DndContext>

        <UpsertTopicDialog
          initialData={{
            title: editingTopic?.title || "",
            description: editingTopic?.description || "",
          }}
          isOpen={isDialogOpen || Boolean(editingTopic)}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingTopic(null);
          }}
          isLoading={isSaving}
          onSave={editingTopic ? handleUpdateTopic : handleCreateTopic}
        />
      </div>
    </div>
  );
}

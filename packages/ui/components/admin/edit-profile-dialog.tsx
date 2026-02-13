import {
	CheckIcon,
	ImagePlusIcon,
	LoaderCircleIcon,
	XIcon,
} from 'lucide-react';
import { type ReactNode, useEffect, useId, useState } from 'react';
import { toast } from 'sonner';
import { useMutation } from 'urql';
import { Button } from 'ui/components/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from 'ui/components/dialog';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { UpdateUserProfileDocument } from 'gql-generated/gql/graphql';
import type {
	UpdateUserProfileMutation,
	UpdateUserProfileMutationVariables,
	User,
} from 'gql-generated/generated/types';
import { useImageUpload } from 'ui/hooks/use-image-upload';
import { uploadFileToCloudinary } from 'ui/lib/cloudinary';
import { PhoneInput } from 'ui/components/phone-input';

export function EditProfileDialog({
	open,
	userData,
	onOpenChange,
	trigger,
}: {
	open: boolean;
	onOpenChange: (value: boolean) => void;
	userData: User;
	trigger?: ReactNode;
}): ReactNode {
	const id = useId();
	const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || '');
	const [, onUpdateUserProfileMutation] = useMutation<
		UpdateUserProfileMutation,
		UpdateUserProfileMutationVariables
	>(UpdateUserProfileDocument);
	const [profilePicture, setProfilePicture] = useState(
		userData?.profilePicture || '',
	);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		setPhoneNumber(userData?.phoneNumber || '');
	}, [userData]);

	const { file, ...avatarProps } = useImageUpload();

	const handleUpdateUserProfile = async (formData: FormData) => {
		try {
			setIsUpdating(true);
			const formValues = Object.fromEntries(formData.entries());

			let uploadImageUrl = profilePicture;

			if (file) {
				uploadImageUrl = await uploadFileToCloudinary(file, 'image');
			}

			const response = await onUpdateUserProfileMutation({
				input: {
					email: formValues.email?.toString() || userData.email,
					fullName: formValues.fullName?.toString() || userData.fullName,
					userName: formValues.username?.toString() || userData.userName,
					occupation: formValues.occupation?.toString() || userData.occupation,
					major: formValues.major?.toString() || userData.major,
					phoneNumber: phoneNumber || userData.phoneNumber,
					profilePicture: uploadImageUrl || userData.profilePicture,
				},
			});

			if (!response.data?.updateUserProfile && response.error?.message) {
				console.error('Error updating profile: ', response.error);
				toast.error('Ocurrio un error', {
					description: 'No se pudo actualizar el perfil, intenta de nuevo.',
				});
				setIsUpdating(false); // Set isUpdating to false on error
			} else {
				toast.success('Perfil actualizado', {
					description: 'Tu perfil ha sido actualizado correctamente.',
				});
				setTimeout(() => onOpenChange(false), 1000);
				setIsUpdating(false); // Set isUpdating to false on success
			}
		} catch (error) {
			toast.error('Ocurrio un error', {
				description: 'No se pudo actualizar el perfil, intenta de nuevo.',
			});
			console.error('Error updating profile: ', error);
			setIsUpdating(false); // Set isUpdating to false on catch
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				{trigger ? trigger : <Button variant="neutral">Editar perfil</Button>}
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
				<DialogHeader className="contents space-y-0 text-left">
					<DialogTitle className="border-b px-6 py-4 text-base">
						Editar perfil
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className="sr-only">
					Make changes to your profile here. You can change your photo and set a
					username.
				</DialogDescription>
				<div className="overflow-y-auto">
					<Avatar
						file={file}
						defaultImage={userData?.profilePicture || ''}
						{...avatarProps}
					/>
					<div className="px-6 pt-4 pb-6">
						<form
							className="space-y-4"
							action={handleUpdateUserProfile}
							onSubmit={async (event) => {
								event.preventDefault();
								const formData = new FormData(event.currentTarget);
								await handleUpdateUserProfile(formData);
							}}
							id="edit-profile-form"
						>
							<div className="flex gap-4">
								<div className="flex-1 space-y-2">
									<Label htmlFor={`${id}-first-name`}>Nombre completo</Label>
									<Input
										id={`${id}-first-name`}
										placeholder="Matt"
										defaultValue={userData?.fullName}
										type="text"
										name="fullName"
										required
									/>
								</div>
							</div>
							<div className="*:not-first:mt-2">
								<Label htmlFor={`${id}-username`}>Usuario</Label>
								<div className="relative">
									<Input
										id={`${id}-username`}
										className="peer pe-9"
										placeholder="Username"
										defaultValue={userData?.userName}
										type="text"
										name="username"
										required
									/>
									<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
										<CheckIcon
											size={16}
											className="text-emerald-500"
											aria-hidden="true"
										/>
									</div>
								</div>
							</div>
							<div className="*:not-first:mt-2">
								<Label htmlFor={`${id}-occupation`}>Ocupacion</Label>
								<div className="flex rounded-lg shadow-xs">
									<Input
										id={`${id}-occupation`}
										placeholder="Software Engineer"
										defaultValue={userData?.occupation ?? ''}
										type="text"
										name="occupation"
									/>
								</div>
							</div>
							<div className="*:not-first:mt-2">
								<Label htmlFor={`${id}-occupation`}>Carrera</Label>
								<Input
									id={`${id}-major`}
									placeholder="Teacher Computer Science"
									defaultValue={userData?.major ?? ''}
									type="text"
									name="major"
								/>
							</div>
							<div className="*:not-first:mt-2">
								<PhoneInput
									placeholder="Ingresa tu telefono celular"
									value={phoneNumber}
									onChange={setPhoneNumber}
									label="Telefono"
								/>
							</div>
						</form>
					</div>
				</div>
				<DialogFooter className="border-t bg-[#F7F7F7] sm:justify-between px-6 py-4">
					<DialogClose asChild>
						<Button type="button" variant="neutral" disabled={isUpdating}>
							Cancelar
						</Button>
					</DialogClose>
					<Button type="submit" form="edit-profile-form" disabled={isUpdating}>
						{isUpdating ? (
							<>
								<LoaderCircleIcon
									className="-ms-1 animate-spin"
									size={16}
									aria-hidden="true"
								/>
								Guardando cambios
							</>
						) : (
							'Guardar cambios'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

interface AvatarProps extends ReturnType<typeof useImageUpload> {
	defaultImage?: string;
}

function Avatar({
	defaultImage,
	previewUrl,
	fileInputRef,
	fileName,
	handleThumbnailClick,
	handleFileChange,
}: AvatarProps) {
	const currentImage = previewUrl || defaultImage;

	return (
		<div className="mt-4 px-6 flex items-center gap-4">
			<div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
				{currentImage && (
					<img
						src={currentImage}
						className="h-full w-full object-cover"
						width={80}
						height={80}
						alt="Profile"
					/>
				)}
			</div>
			<div className="relative inline-block">
				<Button onClick={handleThumbnailClick} aria-haspopup="dialog">
					{fileName || currentImage ? 'Change image' : 'Upload image'}
				</Button>
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					className="hidden"
					accept="image/*"
					aria-label="Upload image file"
				/>
			</div>
		</div>
	);
}

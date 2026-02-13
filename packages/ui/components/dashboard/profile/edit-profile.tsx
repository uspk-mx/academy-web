// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import type { z } from "zod";
// import { Button, Input } from "ui/components/index";
// import type { Me } from "gql-generated/generated/types";
// import { cn } from "ui/lib/utils";

// interface EditProfileProps {
//   userData: Omit<Me, "__typename">;
//   isEditing: boolean;
//   onCancelEdit: () => void;
// }

// export const EditProfile = ({
//   userData,
//   isEditing,
//   onCancelEdit,
// }: EditProfileProps) => {
// const { } = useForm({
//   mode: 'onSubmit',
//       resolver: zodResolver<z.output<typeof signInSchema>>(signInSchema),
// })


//   return (
//     <div className="relative">
//       <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-[#54CA95]" />
//       <div className="relative rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//         <h1 className="mb-6 text-3xl font-black">Mi Perfil</h1>

//         <div className="grid gap-6">
//           {/* Personal Information */}
//           <div>
//             <h2 className="mb-4 inline-block border-b-4 border-[#FF3D5A] text-xl font-black">
//               Informacion Personal
//             </h2>

//             <div className="grid gap-4 md:grid-cols-2">
//               <div>
//                 <label htmlFor="fullName" className="block font-bold">
//                   Nombre Completo
//                 </label>
//                 <Input
//                   type="text"
//                   name="fullName"
//                   value={userData?.fullName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={cn(
//                     "rounded-lg border-4 border-black p-2 font-bold",
//                     {
//                       "disabled:bg-[#FDFAEE] disabled:opacity-100": !isEditing,
//                     }
//                   )}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="userName" className="block font-bold">
//                   Usuario
//                 </label>
//                 <Input
//                   type="text"
//                   name="userName"
//                   value={userData.userName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={cn(
//                     "rounded-lg border-4 border-black p-2 font-bold",
//                     {
//                       "disabled:bg-[#FDFAEE] disabled:opacity-100": !isEditing,
//                     }
//                   )}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block font-bold">
//                   Correo electronico
//                 </label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={userData.email}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={cn(
//                     "rounded-lg border-4 border-black p-2 font-bold",
//                     {
//                       "disabled:bg-[#FDFAEE] disabled:opacity-100": !isEditing,
//                     }
//                   )}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Professional Information */}
//           <div>
//             <h2 className="mb-4 inline-block border-b-4 border-[#FFD53D] text-xl font-black">
//               Informacion Profesional
//             </h2>

//             <div className="grid gap-4 md:grid-cols-2">
//               <div>
//                 <label className="block font-bold">Occupation</label>

//                 <Input
//                   type="text"
//                   name="occupation"
//                   value={userData.occupation}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={cn(
//                     "rounded-lg border-4 border-black p-2 font-bold",
//                     {
//                       "disabled:bg-[#FDFAEE] disabled:opacity-100": !isEditing,
//                     }
//                   )}
//                 />
//               </div>

//               <div>
//                 <label className="block font-bold">Major</label>

//                 <Input
//                   type="text"
//                   name="major"
//                   value={userData.major}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={cn(
//                     "rounded-lg border-4 border-black p-2 font-bold",
//                     {
//                       "disabled:bg-[#FDFAEE] disabled:opacity-100": !isEditing,
//                     }
//                   )}
//                 />
//               </div>

//               <div>
//                 <label className="block font-bold">Phone Number</label>

//                 <Input
//                   type="tel"
//                   name="phoneNumber"
//                   value={userData.phoneNumber}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={cn(
//                     "rounded-lg border-4 border-black p-2 font-bold",
//                     {
//                       "disabled:bg-[#FDFAEE] disabled:opacity-100": !isEditing,
//                     }
//                   )}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Interests */}
//           <div>
//             <h2 className="mb-4 inline-block border-b-4 border-[#54CA95] text-xl font-black">
//               Intereses
//             </h2>

//             <div className="mb-4 flex flex-wrap gap-2">
//               {userData?.interests && userData?.interests?.length > 0 ? (
//                 userData.interests.map((interest, index) => (
//                   <div
//                     // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
//                     key={index}
//                     className="flex items-center gap-2 rounded-full border-2 border-black bg-[#FFD53D] px-3 py-1"
//                   >
//                     <span className="font-bold">{interest}</span>
//                     {isEditing && (
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveInterest(index)}
//                         className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p>Sin intereses agregados</p>
//               )}
//             </div>

//             {isEditing && (
//               <div className="flex gap-2">
//                 <Input
//                   type="text"
//                   value={newInterest}
//                   onChange={(e) => setNewInterest(e.target.value)}
//                   placeholder="Agrega un nuevo interes"
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       handleAddInterest();
//                     }
//                   }}
//                 />
//                 <Button type="button" onClick={handleAddInterest}>
//                   Agregar
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Biography */}
//           {/* <div>
//         <h2 className="mb-4 inline-block border-b-4 border-black text-xl font-black">
//           Biography
//         </h2>

//         {isEditing ? (
//           <textarea
//             name="biography"
//             value={formData.biography}
//             onChange={handleChange}
//             rows={4}
//             className="w-full rounded-lg border-4 border-black bg-white p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-[#FF3D5A]"
//           />
//         ) : (
//           <p className="rounded-lg border-4 border-black bg-[#FDFAEE] p-2 font-bold">
//             {formData.biography}
//           </p>
//         )}
//       </div> */}
//         </div>

//         {/* Action buttons for edit mode */}
//         {isEditing && (
//           <div className="mt-6 flex justify-end gap-4">
//             <Button type="button" onClick={onCancelEdit} variant="neutral">
//               Cancelar
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

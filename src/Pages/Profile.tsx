import { LiaUserCircleSolid } from "react-icons/lia";
import { useAuth } from "../Providers/AuthProvider";

function Profile() {
  const { user } = useAuth();
  return (
    <div className="pb-28 mx-auto">
      <div className="flex flex-col items-center mb-20 justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
          Profile
        </h1>
		<div className="flex flex-col gap-3 items-center justify-center my-3 px-3 pt-4 pb-8 md:px-10 border bg-white border-gray-300 rounded-md cursor-pointer w-3/4 md:w-[640px]">

        <div>
          <LiaUserCircleSolid size={130} />
        </div>
        {!user.isApproved && (
          <p className="text-red-500 text-center border border-red-500 rounded-md py-1 px-3 m-2">
            This account is not approved yet
          </p>
        )}
        <div>
          <h1 className="text-2xl font-bold text-center">
            {user.firstName + " " + user.lastName}
          </h1>
          <h1 className="text-xl text-center">{user.email}</h1>
        </div>
		</div>
      </div>
    </div>
  );
}

export default Profile;

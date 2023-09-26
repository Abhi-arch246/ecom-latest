import { Link } from "react-router-dom";
import { useAllUsersQuery } from "../../slices/usersApiSlice";
import { FaCircleChevronLeft } from "react-icons/fa6";
import moment from "moment";

function UserList() {
  const { data: allusers, isLoading, error } = useAllUsersQuery();

  return (
    <>
      <div className="pt-7 pl-1 md:pl-10">
        <Link className="bg-slate-600 p-2 rounded-md text-white" to="/admin">
          <span className="px-2">
            <FaCircleChevronLeft className="inline" />
          </span>
          Go back
        </Link>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <h1 className="text-3xl py-4 font-bold text-center">All Users</h1>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full m-4 text-left text-sm font-light">
                  <thead className="border-b text-center bg-slate-500 font-medium ">
                    <tr>
                      <th className="text-md p-5">User Id</th>
                      <th className="text-md p-5">User name</th>
                      <th className="text-md p-5">User email</th>
                      <th className="text-md p-5">Admin</th>
                      <th className="text-md p-5">Created time</th>
                      <th className="text-md p-5">Updated time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <img
                        width="450px"
                        src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                        alt="Loading ..."
                      />
                    )}
                    {allusers?.map((item) => {
                      return (
                        <tr
                          className="border-b text-center bg-neutral-100"
                          key={item._id}
                        >
                          <Link
                            className="hover:underline"
                            to={`/order/${item._id}`}
                          >
                            <td className="py-6 font-bold">{item._id}</td>
                          </Link>

                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          {item.isAdmin ? (
                            <td>
                              <p className="bg-green-500 inline p-2 rounded-md">
                                Yes
                              </p>
                            </td>
                          ) : (
                            <td>
                              <p className="bg-red-500 text-white inline md:p-2 p-1 rounded-md">
                                No
                              </p>
                            </td>
                          )}

                          <td className="px-4">
                            {moment(item.createdAt).format("LLL")}
                          </td>
                          <td className="px-4">
                            {moment(item.updatedAt).format("LLL")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;

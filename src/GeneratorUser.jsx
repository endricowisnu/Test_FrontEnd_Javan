import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar, UserPlus, RefreshCw } from "lucide-react";
import { Toaster, toast } from "sonner";

export const GeneratorUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeKey, setFadeKey] = useState(0);

  const fetchUser = async () => {
    const toastId = toast("Loading new profile...", {
      duration: Infinity,
      style: {
        backgroundColor: "#000",
        color: "#fff",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "10px 16px",
      },
    });

    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      setUser(data.results[0]);
      setFadeKey((prev) => prev + 1);

      toast.dismiss(toastId);
      toast.success("Profile loaded!", { duration: 2000 });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to load profile!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-50 to-blue-100">
        <Toaster richColors />
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  const birthday = new Date(user.dob.date);
  const registered = new Date(user.registered.date);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-blue-100 px-4 py-12 sm:px-6 lg:px-8">
      <Toaster richColors />

      <div className="text-center mb-8 mt-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent flex items-center justify-center gap-2">
          Random Profile Generator
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Discover random people from around the world
        </p>
      </div>

      <div
        key={fadeKey}
        className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col md:flex-row w-[90%] max-w-[1000px] items-center gap-8 md:gap-10 transition-all duration-700 ease-in-out opacity-0 animate-fadeIn"
      >
        <div className="flex flex-col items-center md:w-1/3 text-center">
          <div
            className={`image-wrapper ${
              user.gender === "male" ? "glow-male" : "glow-female"
            }`}
          >
            <img
              src={user.picture.large}
              alt="Profile"
              className="h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 rounded-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mt-4 capitalize text-gray-800">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-gray-500 capitalize">{user.gender}</p>

          <p className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-2">
            {user.nat} — {user.location.country}
            <img
              src={`https://flagcdn.com/w40/${user.nat.toLowerCase()}.png`}
              alt={user.location.country}
              className="w-5 h-3 rounded shadow-sm transition-transform duration-300 hover:scale-110"
            />
          </p>
        </div>
        <div className="flex-1 space-y-4 w-full">
          <div className="info-card flex items-start gap-3 bg-purple-50 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-md">
            <Mail className="text-purple-500 w-6 h-6 mt-1" />
            <div>
              <p className="text-sm text-gray-500">EMAIL</p>
              <p className="font-medium text-sm sm:text-base break-words">{user.email}</p>
            </div>
          </div>

          <div className="info-card flex items-start gap-3 bg-blue-50 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-md">
            <Phone className="text-blue-500 w-6 h-6 mt-1" />
            <div>
              <p className="text-sm text-gray-500">PHONE</p>
              <p className="font-medium">{user.phone}</p>
              <p className="text-sm text-gray-400">Cell: {user.cell}</p>
            </div>
          </div>

          <div className="info-card flex items-start gap-3 bg-pink-50 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-md">
            <MapPin className="text-pink-500 w-6 h-6 mt-1" />
            <div>
              <p className="text-sm text-gray-500">ADDRESS</p>
              <p className="font-medium text-sm sm:text-base break-words">
                {user.location.street.number} {user.location.street.name},{" "}
                {user.location.city}, {user.location.state},{" "}
                {user.location.country}
              </p>
              <p className="text-sm text-gray-400">
                Postcode: {user.location.postcode}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center hover:scale-[1.03] transition-all duration-300 hover:shadow-md">
              <Calendar className="w-6 h-6 text-blue-500 mx-auto" />
              <p className="text-gray-600 text-sm mt-2">BIRTHDAY</p>
              <p className="font-bold text-blue-600 text-lg">
                {birthday.toLocaleString("default", { month: "short" })}{" "}
                {birthday.getDate()}
              </p>
              <p className="text-sm text-gray-500">{birthday.getFullYear()}</p>
              <p className="text-sm text-gray-400 mt-1">
                ({user.dob.age} years old)
              </p>
            </div>

            <div className="flex-1 bg-purple-50 rounded-xl p-4 text-center hover:scale-[1.03] transition-all duration-300 hover:shadow-md">
              <UserPlus className="w-6 h-6 text-purple-500 mx-auto" />
              <p className="text-gray-600 text-sm mt-2">REGISTERED</p>
              <p className="font-bold text-purple-600 text-lg">
                {user.registered.age} years
              </p>
              <p className="text-sm text-gray-500">
                {registered.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={fetchUser}
        className="mt-8 mb-8 bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 sm:px-8 py-3 rounded-xl shadow-md hover:opacity-90 transition-all text-sm sm:text-base"
      >
        <RefreshCw className="w-5 h-5 inline-block mr-2 -mt-1" />
         Generate New User
      </button>
    </div>
  );
};


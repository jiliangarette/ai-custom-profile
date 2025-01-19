import { useState } from "react";

const AddProfileForm = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addProfile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: username, data }),
      }
    );

    if (res.ok) {
      setUsername("");
      setData("");
      alert("Profile added successfully!");
    } else {
      alert("Failed to add profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <textarea
        placeholder="Data"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required></textarea>
      <button type="submit">Add Profile</button>
    </form>
  );
};

export default AddProfileForm;

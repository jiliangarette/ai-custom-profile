import { supabase } from "@/lib/supabaseClient";

const TestSupabase = () => {
  const testConnection = async () => {
    const { data, error } = await supabase.from("your_table_name").select("*");
    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Data:", data);
    }
  };

  return (
    <div>
      <button onClick={testConnection}>Test Supabase</button>
    </div>
  );
};

export default TestSupabase;

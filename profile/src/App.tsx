import ReactDOM from "react-dom/client";
import { useRef } from "react";
import "./index.css";
import axios from "axios";

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file);

    try {
      // 1️⃣ Get pre-signed URL from your backend
      const presignRes = await axios.post(
        "https://p4905653sb.execute-api.us-east-1.amazonaws.com/upload",
        {
          key: `uploads/${file.name}`,
          contentType: file.type, // Use actual type, not text/plain
        }
      );

      const { url } = presignRes.data; // Make sure your backend returns { url: "..." }

      // 2️⃣ Upload file directly to storage
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log("✅ Upload successful");
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    }
  };

  return (
    <form>
      <div className="group w-[100px] rounded-full aspect-square relative">
        <img
          src="https://avatars.githubusercontent.com/u/12345678?v=4"
          alt="Profile"
          className="w-full h-full object-cover rounded-full group-hover:opacity-50 transition-opacity duration-300"
        />

        <img
          src="edit-button-svgrepo-com.svg"
          alt="Edit"
          width={20}
          height={20}
          onClick={() => fileInputRef.current?.click()}
          className="absolute left-1/2 bottom-[10px] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </form>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);

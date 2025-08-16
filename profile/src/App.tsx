import ReactDOM from "react-dom/client";
import { useRef, useState } from "react";
import "./index.css";
import axios from "axios";
import { v4 as uuidv4, v4 } from "uuid";
import editButton from "./assets/edit.svg"; // Adjust the path as necessary

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string>("");
  console.log(src, "src state value");
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const key = v4(); // Generate a unique key for the file

    if (!file) return;

    console.log("Selected file:", file);

    try {
      // 1️⃣ Get pre-signed URL from your backend
      const presignRes = await axios.post(
        "https://slbgdkdr12.execute-api.us-east-1.amazonaws.com/upload",
        {
          key: key,
          contentType: file.type, // Use actual type, not text/plain
        }
      );

      const { uploadUrl: url, region, bucket } = presignRes.data; // Make sure your backend returns { url: "..." }

      // 2️⃣ Upload file directly to storage
      await axios.put(url, file);
      setSrc(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);

      console.log("✅ Upload successful");
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    }
  };

  return (
    <form className="flex flex-col items-center gap-4">
      <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 cursor-pointer">
        {/* Profile Image */}
        <img
          src={src || "https://avatars.githubusercontent.com/u/12345678?v=4"}
          alt="Profile"
          className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* Edit Button Overlay */}
        <img
          src={editButton}
          alt="Edit"
          width={28}
          height={28}
          onClick={() => fileInputRef.current?.click()}
          className="absolute left-1/2 bottom-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Optional label */}
      <label className="text-sm text-gray-500">
        Click the image to change your profile
      </label>

      {/* Hidden File Input */}
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

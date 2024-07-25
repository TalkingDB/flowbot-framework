import React, { useState } from "react";
import CreateChatbot from "@/modules/CreateChatbot";
import Leftarrow from "@/assets/svgs/Leftarrow";

const uploadTypes = ["Upload configuration zip file", "Upload the CSS file", "Upload JS files"]
const config = [
    {
        title: "Upload configuration zip file",
        description: "* Chatbot-id will be same as the name of zip folder.",
        submitButtonText: "Upload",
        allowedFileType: ['application/zip', 'application/x-zip-compressed'],
        inputList: []
    },
    {
        title: "Upload configuration css file",
        description: "",
        submitButtonText: "Upload",
        allowedFileType: ['text/css'],
        inputList: [{ label: "Chatbot Id", placeholder: "Enter chatbot Id to update" }]
    },
    {
        title: "Upload configuration js file",
        description: "",
        submitButtonText: "Upload",
        allowedFileType: ['text/javascript'],
        inputList: [{ label: "Chatbot Id", placeholder: "Enter chatbot Id to update" }]
    }
];

const UploadConfig = () => {
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
    const selectedConfig = selectedIndex !== null ? config[selectedIndex] : null;
    return (
        <div className="m-6">
            <button className="flex gap-2"  onClick={() => window.history.back()}>
                <Leftarrow />
                <span className="mb-16 font-bold">Back</span>
            </button>
            
            <div className="flex flex-wrap justify-center items-center w-full mb-6 gap-8">
                {uploadTypes?.map((item, index) => (
                    <div
                        key={index + 1}
                        className="relative max-w-sm bg-white shadow-lg rounded-lg overflow-hidden h-24 hover:shadow-xl"
                    >
                        <button
                            className="mr-4 p-4 h-full flex flex-col justify-center items-center"
                            onClick={() => setSelectedIndex(index)}
                        >
                            <h2 className="text-xl font-bold text-gray-800">{item}</h2>
                        </button>
                    </div>
                )
                )}
            </div>
            {
                selectedConfig ? (
                    <CreateChatbot
                        title={selectedConfig.title}
                        description={selectedConfig.description}
                        submitButtonText={selectedConfig.submitButtonText}
                        allowedFileType={selectedConfig.allowedFileType}
                        inputList={selectedConfig.inputList}
                    />
                ) : (
                    <div>
                        <p>Select Upload Type</p>
                    </div>
                )
            }
        </div>
    )
}

export default UploadConfig
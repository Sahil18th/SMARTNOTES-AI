import { useState } from 'react'
import { Files } from 'lucide-react'
import API from '../Api.js';


function Summarize() {

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [questions, setQuestions] = useState([]);

  const handleText = (e) => {
    setText(e.target.value);
    setSummary("");
    setQuestions([]) // optional but good
  };

  const handleSummarize = async () => {
    try {
      setLoading(true);

      const res = await API.post('/summarize',
        { text: text },
        { withCredentials: true }
      );

      console.log(res.data);

      setQuestions(res.data.questions.split("\n").filter(q => q.trim() !== ""))      // ✅ convert string to array
      setSummary(res.data.summary);

    } catch (error) {
      console.log(error);
      alert("Error generating summary");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='flex  justify-center bg-gray-200 w-full mx-20 mt-5 rounded-xl'>
      <div className=' md:flex justify-between h-[100%] w-[100%] gap-5 p-5 rounded-xl'>

        <div className=' flex-1 bg-white rounded-xl shadow-2xl'>
          <h1 className='text-xl p-3 font-semibold'>Enter Text or Upload Document</h1>

          <div className='w-full h-[1px] bg-gray-200'></div>

          <div className='m-5 p-10 border-2 border-gray-200 border-dashed bg-gray-100 flex-col text-center rounded-lg'>
            <h1 className="flex items-center justify-center gap-2 text-gray-700">
              <Files size={24} />
              Drag & drop PDF or TXT file here
            </h1>
            <button className='text-[#fff] px-3 py-1 rounded-lg mt-3 bg-gradient-to-l from-blue-800 to-blue-500 cursor-pointer  hover:bg-gradient-to-r from-blue-800 to-blue-500'>Browse File</button>
          </div>

          <div className='w-full h-[1px] bg-gray-200'></div>

          <div className="px-5 pt-5">
            <textarea maxLength={5000} value={text} onChange={handleText} placeholder="Paste your text here to summarize..."
              className="w-full h-80 border-2 border-gray-200 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>

          <div className='flex justify-end mr-10 pb-1 text-gray-700'>
            <h1>{text.length} / 5000 characters</h1>
          </div>

          <div className='w-full h-[1px] bg-gray-200'></div>

          <div className='mx-3 mb-3 '>
            <button
              onClick={handleSummarize}
              disabled={!text.trim() || loading}
              className='w-[100%] text-[#fff] px-3 py-2 rounded-lg mt-3 bg-gradient-to-l from-blue-800 to-blue-500 cursor-pointer hover:bg-gradient-to-r from-blue-800 to-blue-500 disabled:opacity-50'
            >
              {loading ? "Generating..." : "⚡ Generate Summary"}
            </button>
          </div>
        </div>


        <div className='flex-1/7 bg-white rounded-xl shadow-2xl'>
          <h1 className='text-xl py-3 px-5 font-semibold'>AI Summary & Questions</h1>

          <div className='w-full h-[1px] bg-gray-200'></div>


          <div className='px-5 py-2 flex gap-10 text-lg text-gray-700'>
            <button
              onClick={() => setActiveTab("summary")}
              className={`cursor-pointer ${activeTab === "summary" ? "font-semibold text-black" : ""
                }`}
            >
              Summary
            </button>

            <button
              onClick={() => setActiveTab("questions")}
              className={`cursor-pointer ${activeTab === "questions" ? "font-semibold text-black" : ""}`}
            >
              Questions
            </button>
          </div>


          <div className='px-5 py-3'>

            {activeTab === "summary" && (
              !summary ? (
                <div className="text-center text-gray-400 mt-10">
                  ✨ Your AI summary will appear here...
                </div>
              ) : (
                <div className="whitespace-pre-line font-medium leading-7">{summary}</div>
              )
            )}


            {activeTab === "questions" && (
              questions.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                  ❓ Questions will appear here...
                </div>
              ) : (
                <ul className="list-disc ">
                  <div className="space-y-4">
                    <div>
                      {questions.map((line, index) => (
                        <p key={index}
                          className={!line.includes("Answer") ? "mt-3" : ""}
                        >
                          {line.includes("Answer") ? (
                            <span>{line}</span>
                          ) : (
                            <strong>{line}</strong>
                          )}
                        </p>
                      ))}
                    </div>

                  </div>
                </ul>
              )
            )}
          </div>




          <div className='w-full h-[1px] bg-gray-200'></div>
        </div>
      </div>
    </div>
  )
}

export default Summarize;

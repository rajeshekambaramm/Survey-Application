import { useEffect, useState } from "react";

export default function QuestionForm({
    onSave,
    questionData,
    loading
}) {

    const [question, setQuestion] = useState(
    questionData?.question || ""
);

const [type, setType] = useState(
    questionData?.type || "text"
);

const [options, setOptions] = useState(
    questionData?.options || [""]
);

useEffect(() => {

    if (!questionData) return;

    setQuestion(questionData.question);

    setType(questionData.type);

    setOptions(questionData.options || [""]);

}, [questionData]);

    const addOption = () => {

        setOptions([...options, ""]);

    };

    const updateOption = (index, value) => {

        const temp = [...options];

        temp[index] = value;

        setOptions(temp);

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave({
            question,
            type,
            options: type === "radio" ? options : []
        });

        setQuestion("");

        setType("text");

        setOptions([""]);

    };

    return (

        <div className="card mb-4">

            <div className="card-body">

                <h4>Add Question</h4>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Question</label>

                        <input
                            className="form-control"
                            value={question}
                            onChange={(e)=>setQuestion(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Question Type</label>

                        <select
                            className="form-select"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                        >

                            <option value="text">
                                Text
                            </option>

                            <option value="radio">
                                Radio
                            </option>

                        </select>

                    </div>

                    {
                        type==="radio" && (

                            <>

                                <h6>Options</h6>

                                {
                                    options.map((option,index)=>(

                                        <input
                                            key={index}
                                            className="form-control mb-2"
                                            placeholder={`Option ${index+1}`}
                                            value={option}
                                            onChange={(e)=>updateOption(index,e.target.value)}
                                        />

                                    ))
                                }

                                <button
                                    type="button"
                                    className="btn btn-secondary mb-3"
                                    onClick={addOption}
                                >
                                    + Add Option
                                </button>

                            </>

                        )
                    }

                    <br/>

                    <button
    className="btn btn-primary"
    disabled={loading}
>

    {

        loading

            ? (

                <>

                    <span
                        className="spinner-border spinner-border-sm me-2"
                    />

                    Saving...

                </>

            )

            : "Save Question"

    }

</button>

                </form>

            </div>

        </div>

    );

}
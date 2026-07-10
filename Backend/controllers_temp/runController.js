import axios from "axios";

export const runCode = async (req, res) => {
    try {
        const { code, language_id, stdin } = req.body;

        const response = await axios.post(
            "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
            {
                source_code: code,
                language_id,
                stdin: stdin || ""
            }
        );

        res.json(response.data);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Execution Failed"
        });
    }
};
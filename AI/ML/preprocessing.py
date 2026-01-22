import json, pandas as pd
import os

def preprocess_gsm8k(path_in, path_out):
    rows = []
    with open(path_in, "r") as f:
        for i, line in enumerate(f):
            obj = json.loads(line)
            question = obj["question"].strip()
            answer = obj["answer"].strip()

            final = answer.split("####")[-1].strip() if "####" in answer else ""
            text = f"Question: {question}\nAnswer Steps: {answer}\nFinal Answer: {final}"

            rows.append({
                "id": f"gsm8k_{i}",
                "topic": "arithmetic",
                "grade": "6-8",
                "type": "example",
                "text": text
            })

    df = pd.DataFrame(rows)
    df.to_csv(path_out, index=False)
    print(f"GSM8K saved → {path_out} ({len(df)} rows)")

def preprocess_algebra(path_in, path_out):
    with open(path_in, "r") as f:
        data = json.load(f)

    rows = []
    for i, item in enumerate(data):
        question = item.get("sQuestion", "").strip()
        equations = " | ".join(item.get("lEquations", []))
        solutions = ", ".join(map(str, item.get("lSolutions", [])))
        template = " | ".join(item.get("Template", []))

        text = (
            f"Question: {question}\n"
            f"Equations: {equations}\n"
            f"Template: {template}\n"
            f"Solutions: {solutions}"
        )

        rows.append({
            "id": f"algebra_{i}",
            "topic": "algebra",
            "grade": "8-10",
            "type": "algebraic",
            "text": text
        })

    df = pd.DataFrame(rows)
    df.to_csv(path_out, index=False)
    print(f"Algebra dataset saved → {path_out} ({len(df)} rows)")



if __name__ == "__main__":
    base_dir = os.path.dirname(__file__)

    # GSM8K paths
    gsm_in = os.path.join(base_dir, "data", "gsm8k", "train.jsonl")
    gsm_out = os.path.join(base_dir, "data", "gsm8k", "gsm8k_clean.csv")

    # Algebra paths
    alg_in = os.path.join(base_dir, "data", "algebra", "draw.json")
    alg_out = os.path.join(base_dir, "data", "algebra", "algebra_clean.csv")

    # Run both preprocessors
    preprocess_gsm8k(gsm_in, gsm_out)
    preprocess_algebra(alg_in, alg_out)


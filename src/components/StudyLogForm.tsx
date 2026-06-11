import { useEffect, useState } from "react";
import { CATEGORY_VARIANTS, MOTIVATION_VARIANTS } from "../constants";
import type { Category, Motivation, NewStudyLog } from "../types";

type StudyFormProps = {
  defaultDate: string;
  onSubmit: (log: NewStudyLog) => void;
};

const StudyForm = ({ defaultDate, onSubmit }: StudyFormProps) => {
  const [date, setDate] = useState(defaultDate);
  const [category, setCategory] = useState<Category | "">("");
  const [motivation, setMotivation] = useState<Motivation | "">("");
  const [minutes, setMinutes] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => setDate(defaultDate), [defaultDate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      date,
      category: category as Category,
      motivation: motivation as Motivation,
      minutes: Number(minutes),
      memo: memo.trim(),
    });

    setCategory("");
    setMotivation("");
    setMinutes("");
    setMemo("");
  };

  return (
    <section className="card p-6">
      <h2 className="text-lg font-semibold">学習ログを追加</h2>
      <p className="mt-1 text-sm text-slate-500">入力内容はこのブラウザに保存されます。</p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="date">日付</label>
          <input
            className="input"
            id="date"
            onChange={(event) => setDate(event.target.value)}
            required
            type="date"
            value={date}
          />
        </div>

        <div>
          <label className="label" htmlFor="category">学習トピック</label>
          <select
            className="input"
            id="category"
            onChange={(event) => setCategory(event.target.value as Category)}
            required
            value={category}
          >
            <option value="">選択してください</option>
            {CATEGORY_VARIANTS.map(({ category: name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="minutes">学習時間（分）</label>
          <input
            className="input"
            id="minutes"
            min="1"
            onChange={(event) => setMinutes(event.target.value)}
            placeholder="例: 60"
            required
            step="1"
            type="number"
            value={minutes}
          />
        </div>

        <fieldset>
          <legend className="label">自己評価</legend>
          <div className="flex gap-2">
            {MOTIVATION_VARIANTS.map(({ rank, label, Icon, color }) => (
              <button
                aria-label={`自己評価: ${label}`}
                aria-pressed={motivation === rank}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-3 text-xs font-medium transition ${
                  motivation === rank
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 hover:bg-slate-50"
                }`}
                key={rank}
                onClick={() => setMotivation(rank)}
                type="button"
              >
                <Icon aria-hidden="true" className={`h-6 w-6 ${color}`} />
                {label}
              </button>
            ))}
          </div>
          <input
            className="sr-only"
            onChange={() => undefined}
            required
            tabIndex={-1}
            value={motivation}
          />
        </fieldset>

        <div>
          <label className="label" htmlFor="memo">メモ（任意）</label>
          <textarea
            className="input min-h-24 resize-y"
            id="memo"
            maxLength={300}
            onChange={(event) => setMemo(event.target.value)}
            placeholder="学んだことや次に取り組むこと"
            value={memo}
          />
        </div>

        <button className="primary-button w-full" type="submit">ログを追加</button>
      </form>
    </section>
  );
};

export default StudyForm;

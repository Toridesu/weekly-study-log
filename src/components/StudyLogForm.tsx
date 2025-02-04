import { memo, useState } from "react";  // memo のインポート
import { StudyLog } from "../types";
import {
  CATEGORIE_VARIANTS,
  MOTIVATION_VARIANTS,
  WEEK_DAYS,
} from "../constants";

type StudyFormProps = {
  onSubmit: (log: Omit<StudyLog, "id">) => void;
};

const StudyForm = memo((props: StudyFormProps) => {
  console.log("StudyFormのレンダリング");
  const [day, setDay] = useState<StudyLog['day'] | ''>();
  const [category, setCategory] = useState<StudyLog['category'] | ''>();
  const [motivation, setMotivation] = useState<StudyLog['motivation'] | ''>();
  const [minutes, setMinutes] = useState(0);
  const [memo, setMemo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!day || !category || !motivation || !minutes) {
      return;
    }

    const log = {
      day,
      category,
      motivation,
      minutes: minutes,
      memo,
    };
    props.onSubmit(log);

    setDay('');
    setCategory('');
    setMotivation('');
    setMinutes(0);
    setMemo('');
  };
  return (
    <div className='bg-white shadow-sm rounded-lg p-6 mb-4'>
      <h2 className='text-lg font-semibold text-gray-900 mb-3'>新規ログの追加</h2>

      <form className='space-y-3' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-3 space-y-3'>
          {/* 曜日選択 */}
          <div>
            <select id='day' value={day} onChange={(e) => setDay(e.target.value as StudyLog['day'])} className='block text-sm text-gray-700 w-full rounded-md p-2 border shadow-sm '>
              <option value=''>曜日</option>
              {WEEK_DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          {/* カテゴリー選択 */}
          <div>
            <select id='category' value={category} onChange={(e) => setCategory(e.target.value as StudyLog['category'])} className='block w-full text-sm text-gray-700 rounded-md p-2 border shadow-sm '>
              <option value=''>学習トピック</option>
              {CATEGORIE_VARIANTS.map(({ category }) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* 作業時間入力 */}
          <div>
            <label htmlFor='minutes' className='block text-sm font-medium text-gray-700 mb-1'>
              作業時間
            </label>
            <input type='number' id='minutes' value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} placeholder='(分)' className='block p-2 text-sm border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' />
          </div>
          {/* モチベーション選択 */}
          <div>
            <span className='block text-sm font-medium text-gray-700 mb-1'>自己評価</span>
            <div className='flex space-x-1'>
              {MOTIVATION_VARIANTS.map(({ rank, Icon, color }) => (
                <button type='button' onClick={() => setMotivation(rank as StudyLog['motivation'])} key={rank} className={`w-full rounded-xl border p-6 ${motivation === rank && 'bg-gray-100'}`}>
                  <Icon className={`w-8 h-8 ${color}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* メモ入力 */}
        <div>
          <label htmlFor='memo' className='block text-sm font-medium text-gray-700 mb-1'>
            メモ：
          </label>
          <textarea id='memo' value={memo} onChange={(e) => setMemo(e.target.value)} placeholder='（任意）' className='block border text-sm p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-20' />
        </div>
        {/* 送信ボタン */}
        <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'>
          追加
        </button>
      </form>
    </div>
  );
});
export default StudyForm;

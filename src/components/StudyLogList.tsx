import { Trash2 } from 'lucide-react';
import { StudyLog } from '../types';
import { getCategoryIcon, getMotivationObject } from '../utils';

interface StudyLogListProps {
  logs: StudyLog[];
  onDelete: (id: string) => void;
}

function StudyLogList({ logs, onDelete }: StudyLogListProps) {
  return (
    <div className='p-6 border-gray-400 border rounded-xl bg-white/50 backdrop-blur-sm'>
      <h2 className='text-lg font-semibold mb-4'>Study Log History</h2>

      <div className='space-y-4'>
        {logs.map((log) => {
          const categoryIcon = getCategoryIcon(log.category);
          const motivationObject = getMotivationObject(log.motivation);
          return (
            <div key={log.id} className='p-4 rounded-lg border bg-white/80 hover:bg-white transition-colors'>
              <div className='flex justify-between items-start'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <p className='text-xl'>{categoryIcon}</p>
                    <span className='font-medium capitalize'>{log.category}</span>
                    <span className='text-sm text-gray-500 capitalize'>{log.day}</span>
                  </div>
                  <p className='text-sm text-gray-600'>{log.memo}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    {motivationObject && (
                      <motivationObject.Icon
                        className={`w-4 h-4 ${motivationObject.color}
                        }`}
                      />
                    )}
                    <span className='text-sm font-medium'>{log.minutes} min</span>
                  </div>
                  <button onClick={() => onDelete(log.id)} className='text-red-500 hover:text-red-700 hover:bg-red-50'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudyLogList;

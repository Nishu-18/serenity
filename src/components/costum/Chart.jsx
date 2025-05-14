import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';


const moodMap = {
  Happy: 5,
  Normal: 4,
  Neutral: 3,
  Sad: 2,
  Depressed: 1,
  Angry: 0,
};

const moodLabels = Object.entries(moodMap).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

// Sample weekly mood data with mood type
const weeklyMoodData = [
  { day: 'Mon', moodType: 'Neutral' },
  { day: 'Tue', moodType: 'Depressed' },
  { day: 'Wed', moodType: 'Normal' },
  { day: 'Thu', moodType: 'Angry' },
  { day: 'Fri', moodType: 'Neutral' },
  { day: 'Sat', moodType: 'Happy' },
  { day: 'Sun', moodType: 'Sad' },
];

// Mood Distribution Pie Chart Data
const moodDistribution = [
  { name: 'Happy', value: 1 },
  { name: 'Frustrated', value: 1 },
  { name: 'Low', value: 1 },
  { name: 'Positive', value: 1 },
];

const COLORS = ['#00C49F', '#FF8042', '#8884d8', '#00ffff']; // Normal, Angry, Depressed

export default function Chart() {
    return (
        <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={moodDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {moodDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
}
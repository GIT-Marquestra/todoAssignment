import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


interface Todo {
    id: number;
    task: string;
    completed: boolean;
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TaskStatsPieChart = ({activeTasks, completedTasks}: {activeTasks: Todo[], completedTasks: Todo[]}) => {
    const data = [
        { name: 'Active', value: activeTasks.length },
        { name: 'Completed', value: completedTasks.length },
      ];
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TaskStatsPieChart;
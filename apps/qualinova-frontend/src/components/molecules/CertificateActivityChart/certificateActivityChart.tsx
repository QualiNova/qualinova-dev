import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line,
} from 'recharts';

const CertificateActivityChart = ({ data }: { data: { name: string; value: number }[] }) => (
    <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} ticks={[0, 15, 30, 45, 60]} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default CertificateActivityChart;

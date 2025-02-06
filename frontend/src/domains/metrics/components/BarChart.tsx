import Plot from 'react-plotly.js';

import { Layout, Trace } from '../types';

const BarChart: React.FC<{ data: Trace[]; layout: Layout }> = ({ data, layout }) => {
  return (
    <Plot
      data={data as Partial<Plotly.Data>[]}
      layout={{...layout}}
    />
  );
};

export default BarChart;

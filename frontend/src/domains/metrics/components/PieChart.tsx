import Plot from 'react-plotly.js';

import { Layout, PieTrace } from '../types';

const PieChart: React.FC<{ data: PieTrace[]; layout: Layout }> = ({ data, layout }) => {
  return (
    <Plot
      data={data}
      layout={{...layout}}
    />
  );
};

export default PieChart;

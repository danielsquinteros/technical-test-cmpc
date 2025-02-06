import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectProductMetric } from '../slices/metricSlice';

const useProductMetric = () => {
  const metricProduct = useSelector(selectProductMetric);
  return useMemo(() => (metricProduct), [metricProduct]);
};

export default useProductMetric;

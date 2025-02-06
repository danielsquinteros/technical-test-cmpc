import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../slices/productSlice';

const useProducts = () => {
  const products = useSelector(selectProducts);
  return useMemo(() => (products), [products]);
};

export default useProducts;

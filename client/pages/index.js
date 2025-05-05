import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Jueldin Shop - Moçambique</title>
      </Head>

      <main>
        <h1 className="text-3xl font-bold my-8">Produtos em Destaque</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
    }

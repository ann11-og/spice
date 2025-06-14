
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingBag, Coffee, Cake, Pizza } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProductCounter = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('productCounts');
    return saved ? JSON.parse(saved) : {
      producto1: { name: 'Café Premium', count: 0, price: 5.50, icon: Coffee, color: 'from-amber-500 to-orange-600' },
      producto2: { name: 'Pastel Chocolate', count: 0, price: 12.00, icon: Cake, color: 'from-pink-500 to-rose-600' },
      producto3: { name: 'Pizza Especial', count: 0, price: 18.50, icon: Pizza, color: 'from-red-500 to-orange-500' },
      producto4: { name: 'Smoothie Natural', count: 0, price: 8.00, icon: ShoppingBag, color: 'from-green-500 to-emerald-600' }
    };
  });

  useEffect(() => {
    localStorage.setItem('productCounts', JSON.stringify(products));
  }, [products]);

  const incrementProduct = (productId) => {
    setProducts(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        count: prev[productId].count + 1
      }
    }));
    
    toast({
      title: "¡Producto vendido! 🎉",
      description: `${products[productId].name} agregado al conteo`,
      duration: 2000,
    });
  };

  const decrementProduct = (productId) => {
    if (products[productId].count > 0) {
      setProducts(prev => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          count: prev[productId].count - 1
        }
      }));
      
      toast({
        title: "Producto removido",
        description: `${products[productId].name} removido del conteo`,
        duration: 2000,
      });
    }
  };

  const getTotalSales = () => {
    return Object.values(products).reduce((total, product) => 
      total + (product.count * product.price), 0
    ).toFixed(2);
  };

  const getTotalItems = () => {
    return Object.values(products).reduce((total, product) => 
      total + product.count, 0
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
          Control de Ventas
        </h1>
        <p className="text-muted-foreground">Gestiona tus productos vendidos con un click</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <Card className="finance-card glow-effect">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Vendido</p>
              <p className="text-3xl font-bold text-green-400">${getTotalSales()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="product-card glow-effect">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Productos Vendidos</p>
              <p className="text-3xl font-bold text-blue-400">{getTotalItems()}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(products).map(([productId, product], index) => {
          const IconComponent = product.icon;
          return (
            <motion.div
              key={productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="product-card hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${product.color} flex items-center justify-center mb-3`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">${product.price}</p>
                </CardHeader>
                
                <CardContent className="text-center">
                  <motion.div
                    key={product.count}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-primary mb-4"
                  >
                    {product.count}
                  </motion.div>
                  
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrementProduct(productId)}
                      disabled={product.count === 0}
                      className="hover:bg-red-500/20 hover:border-red-500"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="icon"
                      onClick={() => incrementProduct(productId)}
                      className={`bg-gradient-to-r ${product.color} hover:opacity-90 pulse-animation`}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-3 text-sm text-muted-foreground">
                    Total: <span className="font-semibold text-green-400">
                      ${(product.count * product.price).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCounter;

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import ProductCounter from '@/components/ProductCounter';
import FinanceManager from '@/components/FinanceManager';
import { ShoppingCart, Calculator } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger 
              value="products" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
            >
              <ShoppingCart className="w-4 h-4" />
              Conteo de Productos
            </TabsTrigger>
            <TabsTrigger 
              value="finances"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-blue-600"
            >
              <Calculator className="w-4 h-4" />
              Gestión Financiera
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-6">
            <ProductCounter />
          </TabsContent>
          
          <TabsContent value="finances" className="space-y-6">
            <FinanceManager />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}

export default App;

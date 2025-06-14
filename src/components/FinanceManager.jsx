
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const FinanceManager = () => {
  const [finances, setFinances] = useState(() => {
    const saved = localStorage.getItem('finances');
    return saved ? JSON.parse(saved) : {
      income: [],
      expenses: [],
      totalIncome: 0,
      totalExpenses: 0
    };
  });

  const [newIncome, setNewIncome] = useState({ description: '', amount: '' });
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

  useEffect(() => {
    localStorage.setItem('finances', JSON.stringify(finances));
  }, [finances]);

  const addIncome = () => {
    if (!newIncome.description || !newIncome.amount) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    const income = {
      id: Date.now(),
      description: newIncome.description,
      amount: parseFloat(newIncome.amount),
      date: new Date().toLocaleDateString()
    };

    setFinances(prev => ({
      ...prev,
      income: [...prev.income, income],
      totalIncome: prev.totalIncome + income.amount
    }));

    setNewIncome({ description: '', amount: '' });
    
    toast({
      title: "¡Ingreso agregado! 💰",
      description: `$${income.amount} añadido a los ingresos`,
    });
  };

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    const expense = {
      id: Date.now(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: new Date().toLocaleDateString()
    };

    setFinances(prev => ({
      ...prev,
      expenses: [...prev.expenses, expense],
      totalExpenses: prev.totalExpenses + expense.amount
    }));

    setNewExpense({ description: '', amount: '' });
    
    toast({
      title: "Egreso registrado 📝",
      description: `$${expense.amount} añadido a los gastos`,
    });
  };

  const removeIncome = (id) => {
    const income = finances.income.find(item => item.id === id);
    setFinances(prev => ({
      ...prev,
      income: prev.income.filter(item => item.id !== id),
      totalIncome: prev.totalIncome - income.amount
    }));
    
    toast({
      title: "Ingreso eliminado",
      description: "El registro ha sido removido",
    });
  };

  const removeExpense = (id) => {
    const expense = finances.expenses.find(item => item.id === id);
    setFinances(prev => ({
      ...prev,
      expenses: prev.expenses.filter(item => item.id !== id),
      totalExpenses: prev.totalExpenses - expense.amount
    }));
    
    toast({
      title: "Egreso eliminado",
      description: "El registro ha sido removido",
    });
  };

  const getNetProfit = () => {
    return finances.totalIncome - finances.totalExpenses;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent mb-2">
          Gestión Financiera
        </h1>
        <p className="text-muted-foreground">Controla tus ingresos y egresos</p>
      </motion.div>

      {/* Resumen Financiero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <Card className="finance-card glow-effect">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Ingresos</p>
                <p className="text-2xl font-bold text-green-400">${finances.totalIncome.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="expense-card glow-effect">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-sm text-muted-foreground">Egresos</p>
                <p className="text-2xl font-bold text-red-400">${finances.totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`glow-effect ${getNetProfit() >= 0 ? 'finance-card' : 'expense-card'}`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className={`w-8 h-8 ${getNetProfit() >= 0 ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <p className="text-sm text-muted-foreground">Ganancia Neta</p>
                <p className={`text-2xl font-bold ${getNetProfit() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${getNetProfit().toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección de Ingresos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="finance-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="w-5 h-5" />
                Ingresos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Descripción del ingreso"
                  value={newIncome.description}
                  onChange={(e) => setNewIncome(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Monto"
                  value={newIncome.amount}
                  onChange={(e) => setNewIncome(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-32"
                />
                <Button onClick={addIncome} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {finances.income.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                  >
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-400">${item.amount}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIncome(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sección de Egresos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="expense-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <TrendingDown className="w-5 h-5" />
                Egresos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Descripción del gasto"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Monto"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-32"
                />
                <Button onClick={addExpense} className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {finances.expenses.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                  >
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-400">${item.amount}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExpense(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FinanceManager;

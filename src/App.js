// Hooks
import { useBudgets } from './contexts/BudgetContext';
import { useState } from 'react';

// Styles
import { Stack, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

// Components
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}>
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => {
                return total + expense.amount;
              },
              0
            );

            return (
              <BudgetCard
                name={budget.name}
                amount={amount}
                max={budget.max}
                key={budget.id}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
        </div>
        <UncategorizedBudgetCard
          onAddExpenseClick={() => openAddExpenseModal}
        />
        <TotalBudgetCard />
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
        defaultBudgetId={addExpenseModalBudgetId}
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </>
  );
};

export default App;

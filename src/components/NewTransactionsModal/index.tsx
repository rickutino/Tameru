import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export const NewTransactionsModal: React.FC<NewTransactionModalProps> =
  ({ isOpen, onRequestClose }) => {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('deposit');
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
      event.preventDefault();

      await createTransaction({
        title,
        amount,
        category,
        type
      })
      setTitle('');
      setAmount(0);
      setType('deposit');
      setCategory('');
      onRequestClose();
    }
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Close modal"/>
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Register Transaction</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Value"
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              isActive={type === 'deposit'}
              activeColor="green"
              onClick={() => { setType('deposit') }}
            >
              <img src={incomeImg} alt="Income"/>
              <span>Income</span>
            </RadioBox>
            <RadioBox
              type="button"
              isActive={type === 'withdraw'}
              activeColor="red"
              onClick={() => { setType('withdraw') }}
            >
              <img src={outcomeImg} alt="Outcome"/>
              <span>Outcome</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input 
            type="text" 
            placeholder="Category"
            value={category}
            onChange={event => setCategory(event.target.value)} 
          />

          <button type="submit">Register</button>
        </Container>
      </Modal>
    )
}

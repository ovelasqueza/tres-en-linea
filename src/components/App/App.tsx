import './App.scss';

function App() {
  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-br from-green-600 to-indigo-500'>
      <div className='flex flex-col gap-4 text-center text-indigo-100'>
        <span className='text-9xl font-semibold'>Bienvenido</span>

        <span className='animate-pulse text-2xl' data-testid='description'>
          Vite + React + Tailwindcss + TS
        </span>
      </div>
    </div>
  );
}

export default App;

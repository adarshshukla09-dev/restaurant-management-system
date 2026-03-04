export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-100">
          <span className="text-4xl text-green-600">✓</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your transaction has been completed successfully.
        </p>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300">
          Go to Dashboard
        </button>

      </div>
    </div>
  );
}
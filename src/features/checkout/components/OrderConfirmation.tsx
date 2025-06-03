import { useQueryClient } from '@tanstack/react-query';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { useUpdateTransfer } from '../hooks/useUpdateTransfer';

interface PaymentResponse {
  paymentMessage: string;
  orderId: number;
  success: boolean;
  vnpayInfo?: {
    amount: number;
    payDate: string;
    responseCode: string;
    transactionStatus: string;
    bankCode: string;
    transactionNo: string;
  };
  orderStatus: string;
  paymentStatus: string;
}

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const vnp_Amount = searchParams.get('vnp_Amount');
  const vnp_BankCode = searchParams.get('vnp_BankCode');
  const vnp_CardType = searchParams.get('vnp_CardType');
  const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
  const vnp_PayDate = searchParams.get('vnp_PayDate');
  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
  const vnp_TmnCode = searchParams.get('vnp_TmnCode');
  const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
  const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
  const vnp_TxnRef = searchParams.get('vnp_TxnRef');
  const vnp_SecureHash = searchParams.get('vnp_SecureHash');
  const vnp_BankTranNo = searchParams.get('vnp_BankTranNo');
  const queryClient = useQueryClient();
  const { handleUpdateTransfer } = useUpdateTransfer();
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if this is a VNPay payment by checking if VNPay parameters exist
  const isVNPayPayment = Boolean(vnp_Amount && vnp_TxnRef);

  // Scroll to top on component mount and invalidate cart
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const processPayment = async () => {
      try {
        // Only process VNPay payment if VNPay parameters are present
        if (isVNPayPayment) {
          const result = await handleUpdateTransfer({
            vnp_Amount: vnp_Amount || '',
            vnp_BankCode: vnp_BankCode || '',
            vnp_CardType: vnp_CardType || '',
            vnp_OrderInfo: vnp_OrderInfo || '',
            vnp_PayDate: vnp_PayDate || '',
            vnp_BankTranNo: vnp_BankTranNo || '',
            vnp_ResponseCode: vnp_ResponseCode || '',
            vnp_TmnCode: vnp_TmnCode || '',
            vnp_TransactionNo: vnp_TransactionNo || '',
            vnp_TransactionStatus: vnp_TransactionStatus || '',
            vnp_TxnRef: vnp_TxnRef || '',
            vnp_SecureHash: vnp_SecureHash || '',
          });
          setPaymentResult(result.data);
        } else {
          // For COD payments, create a successful payment result
          setPaymentResult({
            paymentMessage: "Đơn hàng đã được xác nhận",
            orderId: Number(orderId) || 0,
            success: true,
            orderStatus: "PENDING",
            paymentStatus: "COD"
          });
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    processPayment();
    // Invalidate cart queries after payment processing
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">Processing payment...</p>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Error Processing Payment</h1>
          <p className="mb-6 text-gray-600">
            We couldn&apos;t process your payment information. Please try again or contact customer support.
          </p>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Link
              to="/"
              className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Return to Home
            </Link>
            <Link
              to="/cart"
              className="flex-1 rounded-md bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
            >
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Payment was processed but failed (only applies to VNPay)
  if (isVNPayPayment && !paymentResult.success) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Failed</h1>
          <p className="mb-6 text-gray-600">
            {paymentResult.paymentMessage}
          </p>
          <div className="mb-8 rounded-md bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              Order number: <span className="font-bold text-gray-900">#{paymentResult.orderId}</span>
            </p>
            <p className="text-sm text-gray-600">
              Status: <span className="font-medium text-red-600">{paymentResult.paymentStatus}</span>
            </p>
          </div>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Link
              to="/"
              className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Return to Home
            </Link>
            <Link
              to="/cart"
              className="flex-1 rounded-md bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Payment successful (either VNPay success or COD)
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Order Completed!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for your order. Your order has been received and will be processed soon.
        </p>
        
        <div className="mb-8 rounded-md bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            Your order number: <span className="font-bold text-gray-900">#{paymentResult.orderId}</span>
          </p>
          {paymentResult.paymentStatus === "COD" ? (
            <p className="text-sm text-gray-600">
              Payment method: <span className="font-medium">Cash on Delivery</span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Payment method: <span className="font-medium">Bank Transfer</span>
            </p>
          )}
          <p className="text-sm text-gray-600">
            You will receive an email confirmation shortly.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Link
            to="/"
            className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Return to Home
          </Link>
          <Link
            to="/category/paddles"
            className="flex-1 rounded-md bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}; 

export default OrderConfirmation;
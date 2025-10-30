import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            منصة الحرفيين المغاربة
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            منصة متكاملة لإدارة المشاريع والمواد للحرفيين
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Link
              href="/portal"
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">بوابة الحرفي</h2>
                <ArrowRight className="w-6 h-6 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-600">
                إنشاء وإدارة المشاريع، تجميع لائحة المواد، وتصدير البيانات
              </p>
            </Link>

            <Link
              href="/admin"
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-500"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">لوحة التحكم</h2>
                <ArrowRight className="w-6 h-6 text-indigo-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-600">
                إدارة المستخدمين، الكتالوج، والمشاريع
              </p>
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-bold text-lg mb-2">إدارة المشاريع</h3>
              <p className="text-gray-600 text-sm">
                إنشاء وتتبع مشاريعك بسهولة
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛠️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">كتالوج المواد</h3>
              <p className="text-gray-600 text-sm">
                كتالوج شامل للمواد والأدوات
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-bold text-lg mb-2">تصدير البيانات</h3>
              <p className="text-gray-600 text-sm">
                تصدير المشاريع بصيغ متعددة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

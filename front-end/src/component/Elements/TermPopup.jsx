import { useState } from "react";

const TermPopup = ({ button }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            📄 Terms & Conditions
          </h2>
          <button
            onClick={button}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="text-gray-700 space-y-4">
          <h3 className="text-xl font-semibold">
            Syarat dan Ketentuan Penggunaan Situs Web EJPeace Entertainment
          </h3>

          <div>
            <h4 className="font-semibold">1. Pendahuluan</h4>
            <p>
              Selamat datang di situs resmi EJPeace Entertainment. Dengan
              mengakses dan menggunakan situs ini, Anda menyetujui untuk terikat
              oleh syarat dan ketentuan berikut. Apabila Anda tidak menyetujui
              salah satu dari syarat ini, mohon untuk tidak menggunakan situs
              ini.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">2. Definisi</h4>
            <p>
              "Layanan" berarti seluruh produk dan jasa yang ditawarkan oleh
              EJPeace Entertainment, termasuk namun tidak terbatas pada produksi
              kreatif, penyediaan konten, dan manajemen talent.
            </p>
            <p>
              "Pengguna" berarti setiap individu atau entitas yang mengakses
              atau menggunakan situs dan layanan kami.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">3. Akses dan Penggunaan Situs</h4>
            <p>Pengguna dilarang untuk:</p>
            <ul className="list-disc pl-6">
              <li>Melakukan tindakan yang melanggar hukum atau norma etika.</li>
              <li>Mengakses, mengubah, atau meretas sistem situs kami.</li>
              <li>
                Menggunakan data atau konten dalam situs ini untuk kepentingan
                komersial tanpa persetujuan tertulis dari kami.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">4. Hak Kekayaan Intelektual</h4>
            <p>
              Seluruh konten yang terdapat dalam situs ini, termasuk tetapi
              tidak terbatas pada teks, grafik, logo, audio, video, dan
              perangkat lunak adalah milik EJPeace Entertainment dan dilindungi
              oleh hukum hak cipta yang berlaku. Dilarang keras menduplikasi,
              menggunakan, atau menyebarluaskan konten tanpa izin resmi.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">5. Informasi Pengguna</h4>
            <p>
              Kami mengumpulkan informasi tertentu dari pengguna sesuai dengan
              Kebijakan Privasi kami. Dengan menggunakan situs ini, Anda
              menyetujui pengumpulan dan penggunaan informasi sebagaimana diatur
              dalam kebijakan tersebut.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">6. Transaksi dan Pembayaran</h4>
            <ul className="list-disc pl-6">
              <li>
                Seluruh transaksi dilakukan melalui sistem pembayaran elektronik
                yang aman, termasuk metode kartu kredit.
              </li>
              <li>
                Pengguna bertanggung jawab atas keakuratan informasi pembayaran.
              </li>
              <li>
                Pembayaran dianggap sah setelah dikonfirmasi oleh sistem kami.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">7. Pembatalan dan Refund</h4>
            <p>
              Kebijakan pembatalan dan pengembalian dana diatur secara terpisah
              pada bagian Refund Policy. Pastikan Anda membacanya sebelum
              melakukan transaksi.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">8. Perubahan Ketentuan</h4>
            <p>
              EJPeace Entertainment berhak sewaktu-waktu untuk mengubah,
              memperbarui, atau mengganti bagian dari syarat dan ketentuan ini
              tanpa pemberitahuan terlebih dahulu. Perubahan akan segera berlaku
              setelah dipublikasikan di situs ini.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">9. Hukum yang Berlaku</h4>
            <p>
              Syarat dan Ketentuan ini diatur oleh dan ditafsirkan berdasarkan
              hukum Republik Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermPopup;

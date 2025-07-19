const RefundPopup = ({ button }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">💰 Refund Policy</h2>
          <button
            onClick={button}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="text-gray-700 space-y-4">
          <div>
            <h4 className="font-semibold">1. Ketentuan Umum</h4>
            <p>
              EJPeace Entertainment berkomitmen untuk memberikan layanan
              berkualitas tinggi. Namun, dalam kondisi tertentu, kami
              menyediakan opsi pengembalian dana (refund) sesuai dengan
              ketentuan berikut.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">2. Kelayakan Pengembalian Dana</h4>
            <p>Pengajuan refund dapat dipertimbangkan apabila:</p>
            <ul className="list-disc pl-6">
              <li>Layanan belum dimulai atau diproses.</li>
              <li>
                Terjadi kesalahan sistem pembayaran seperti transaksi ganda.
              </li>
              <li>
                Kegagalan layanan dari pihak kami yang dapat dibuktikan secara
                objektif.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Layanan yang Tidak Memenuhi Syarat Refund
            </h4>
            <p>Pengembalian dana tidak berlaku untuk:</p>
            <ul className="list-disc pl-6">
              <li>
                Layanan digital atau kreatif (desain, video, audio) yang sudah
                dimulai proses produksi.
              </li>
              <li>
                Booking studio, talent, atau acara yang dibatalkan sepihak oleh
                klien tanpa pemberitahuan 3 hari sebelumnya.
              </li>
              <li>
                Ketidakpuasan subjektif yang tidak disertai pelanggaran terhadap
                deskripsi layanan.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">4. Prosedur Pengajuan Refund</h4>
            <p>Untuk mengajukan pengembalian dana, silakan:</p>
            <ul className="list-disc pl-6">
              <li>
                Kirim email ke: <strong>ej.peace2@gmail.com</strong> dengan
                subjek: Permintaan Refund
              </li>
              <li>
                Sertakan: nama lengkap, nomor transaksi, tanggal transaksi, dan
                alasan refund.
              </li>
              <li>
                Permintaan harus diajukan maksimal 3 hari kalender setelah
                transaksi.
              </li>
              <li>
                Tim kami akan meninjau dan memberikan keputusan dalam waktu 5–7
                hari kerja.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">5. Proses Pengembalian Dana</h4>
            <p>
              Jika disetujui, pengembalian dana akan dilakukan ke metode
              pembayaran awal dalam jangka waktu maksimal 14 hari kerja,
              tergantung pada kebijakan bank atau penyedia layanan pembayaran
              yang digunakan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RefundPopup;

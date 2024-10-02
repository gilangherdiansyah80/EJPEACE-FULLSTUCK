import express from "express";
import cors from "cors";
import db from './conection.js';
import response from './response.js';
import midtransClient from 'midtrans-client';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoint root
app.get("/", (req, res) => {
    res.send("Letscode!");
});

// Endpoint untuk mengambil data booking
app.get('/api/booking', (req, res) => {
    const sql = "SELECT * FROM bookings";
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve booking data', res);
        } else {
            response(200, result, 'Data From Table booking', res);
        }
    });
});

app.get('/api/level', (req, res) => {
    const sql = 'SELECT * FROM level';
    db.query(sql, (err, result) => {
        if(err) {
            response(500, null, 'Failed to retrieve courses data', res);
        } else {
            response(200, result, 'Data From Table courses', res);
        }
    })
})

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve users data', res);
        } else {
            response(200, result, 'Data From Table users', res);
        }
    });
})

app.get('/api/package', (req, res) => {
    const sql = 'SELECT * FROM package';
    db.query(sql, (err, result) => {
        if( err ) {
            response(500, null, 'Failed to retrieve package data', res);
        } else {
            response(200, result, 'Data From Table package', res);
        }
    })
})

app.get('/api/packageid/:id', (req, res) => {
    const sql = 'SELECT * FROM package WHERE id_paket = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve package data', res);
        } else if (result.length === 0) {
            response(404, null, 'Package not found', res);
        } else {
            response(200, result, 'Data From Table package', res);
        }
    });
});

app.get('/api/siswa/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT id_paket FROM siswa WHERE user_id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve package data', res);
        } else if (result.length === 0) {
            response(404, null, 'Package not found', res);
        } else {
            response(200, result, 'Data From Table package', res);
        }
    });
});

// endpoint untuk menampilkan level
// app.get('/api/levelcourse/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = 'SELECT l.* FROM courses c JOIN level l ON c.id_level = l.id_level WHERE c.id_paket = ?';
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             response(500, null, 'Failed to retrieve package data', res);
//         } else if (result.length === 0) {
//             response(404, null, 'Package not found', res);
//         } else {
//             response(200, result, 'Data From Table package', res);
//         }
//     })
// })

// endpoint untuk menampilkan level
app.get('/api/level', (req, res) => {
    const sql = 'SELECT * FROM level';
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve package data', res);
        } else {
            response(200, result, 'Data From Table package', res);
        }
    })
})

app.get('/api/books', (req, res) => {
    const sql = 'SELECT id,order_id, name, phone, date, time_start, time_end FROM bookings';
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve package data', res);
        } else {
            response(200, result, 'Data From Table package', res);
        }
    })
})

// endpoint untuk menampilkan course
// Endpoint untuk mendapatkan course berdasarkan id_level dan id_paket
app.get('/api/course/:id_paket/:id_level', (req, res) => {
    const { id_level, id_paket } = req.params;

    // Validasi parameter apakah id_level dan id_paket adalah angka
    if (isNaN(id_level) || isNaN(id_paket)) {
        return response(400, null, 'Invalid level or package ID', res); // 400: Bad Request jika parameter tidak valid
    }

    // Query SQL untuk mendapatkan data course berdasarkan id_level dan id_paket
    const sql = 'SELECT * FROM courses WHERE id_level = ? AND id_paket = ?';

    // Eksekusi query dengan parameter yang disesuaikan
    db.query(sql, [id_level, id_paket], (err, result) => {
        if (err) {
            // 500: Internal Server Error jika terjadi kesalahan pada database
            return response(500, null, 'Failed to retrieve package data', res);
        }

        if (result.length === 0) {
            // 404: Not Found jika tidak ada hasil yang ditemukan
            return response(404, null, 'Package not found', res);
        }

        // 200: OK jika data berhasil diambil
        response(200, result, 'Data retrieved successfully', res);
    });
});

app.get('/api/booking/:id', (req, res) => {
    const sql = 'SELECT * FROM bookings WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve booking data', res);
        } else if (result.length === 0) {
            response(404, null, 'Booking not found', res);
        } else {
            response(200, result, 'Data From Table booking', res);
        }
    });
})


// Midtrans Snap API setup
let snap = new midtransClient.Snap({
    isProduction: false, // Set to true if you want Production Environment (accept real transaction).
    serverKey: 'SB-Mid-server-wHln2cytDNe0mhRtqIcQ_Gk3'
});

// Endpoint untuk membuat transaksi Midtrans
app.post('/api/create-transaction/booking', (req, res) => {
    let { booking_id, total, name, email, phone, duration } = req.body;

    let parameter = {
        "transaction_details": {
            "order_id": booking_id,
            "gross_amount": total
        },
        "credit_card": {
            "secure": true
        },
        "item_details": [{
            "id": booking_id,
            "price": 50000,
            "quantity": duration,
            "name": "jam x Rp. 50.000",
        }],
        "customer_details": {
            "name": name,
            "email": email,
            "phone": phone
        }
    };

    snap.createTransaction(parameter)
        .then((transaction) => {
            // Transaction token
            let transactionToken = transaction.token;
            res.json({ transactionToken: transactionToken });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

app.post('/api/create-transaction/package', (req, res) => {
    let { order_id, total, name, email, noTelepon, level } = req.body;
    console.log(total)

    let parameter = {
        "transaction_details": {
            "order_id": order_id,
            "gross_amount": total
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            "name": name,
            "email": email,
            "phone": noTelepon
        }
    };

    snap.createTransaction(parameter)
        .then((transaction) => {
            // Transaction token
            let token = transaction.token;
            res.json({ token: token });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Endpoint untuk menerima notifikasi pembayaran dari Midtrans
app.post('/api/payment-notification', (req, res) => {
    const data = req.body;
    console.log('Received payment data:', data);  // Log data yang diterima

    const { id= Math.floor(Math.random() * 1000), order_id, name, email, phone, date, timeStart, timeEnd, duration, total, status } = data;

    let sql = `INSERT INTO bookings (id, order_id, name, email, phone, date, time_start, time_end, duration, price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=?, email=?, phone=?, date=?, time_start=?, time_end=?, duration=?, price=?, status=?`;

    let params = [ 
        id, order_id , name, email, phone, date, timeStart, timeEnd, duration, total, status,
        name, email, phone, date, timeStart, timeEnd, duration, total, status
    ]; 
   
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert or update booking record', err);
            res.status(500).json({ error: 'Failed to insert or update booking record' });
        } else {
            console.log('Booking record inserted or updated successfully');
            res.status(200).send('OK');
        }
    });
});

// Endpoint POST untuk membuat payments baru
app.post('/api/payment-package', (req, res) => {
    const data = req.body;
    console.log('Received payment data:', data);  // Log data yang diterima

    const { user_id, id_paket, tanggal_payment, tanggal_selesai } = data;

    let sql = `INSERT INTO siswa (user_id, id_paket, tanggal_payment, tanggal_selesai) VALUES (?, ?, ?, ?)`;

    let params = [ 
        user_id, id_paket, tanggal_payment, tanggal_selesai
    ]; 
   
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert payment record', err);
            res.status(500).json({ error: 'Failed to insert payment record' });
        } else {
            console.log('Payment record inserted successfully');
            res.status(200).send('OK');
        }
    });
});

// Endpoint POST untuk membuat user baru
app.post('/api/v1/create-users', (req, res) => {
    const data = req.body;
    console.log(data);
    const { name, username, telepon, email, password } = data;

    let sql = `INSERT INTO users (name, username, telepon, email, password, role) VALUES (?, ?, ?, ?, ?, 'user')`;
    let params = [name, username, telepon, email, password];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert user record', err);
            res.status(500).json({ message: 'Failed to insert user record' });
        } else {
            console.log('User record inserted successfully');
            res.status(201).json({ message: 'User created successfully' });
        }
    });
});

app.post('/verify-user', (req, res) => {
    const { userId } = req.body; // Ambil user_id dari request body

    try {

        
        // Pastikan bahwa user_id dikirim dan bukan undefined atau null
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Eksekusi query ke database
        const sql = 'SELECT * FROM users WHERE user_id = ?';
        db.query(sql, [userId], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err.message); // Log detail error
                return res.status(500).json({ error: 'Error verifying user', details: err.message });
            }// Log hasil dari query

            // Periksa apakah pengguna ditemukan di database
            if (rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Ambil data pengguna
            const user = rows[0];
            res.status(200).json({ user });
        });
    } catch (error) {
        console.error('Error verifying user:', error.message); // Log detail error
        res.status(500).json({ error: 'Error verifying user', details: error.message });
    }
});

app.put('/api/booking/:id', (req, res) => {
    const id = req.params.id
    const { date, time_start, time_end } = req.body

    const sql = 'UPDATE bookings SET date = ?, time_start = ?, time_end = ? WHERE id = ?'
    db.query(sql, [date, time_start, time_end, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating booking', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No booking found with this ID' });
            return;
        }
        res.send({ message: `Booking with ID ${id} has been updated successfully` });
    });
})

app.delete('/api/booking/:id', (req, res) => {
    const id = req.params.id

    const sql = 'DELETE FROM bookings WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting booking', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No booking found with this ID' });
            return;
        }
        res.send({ message: `Booking with ID ${id} has been deleted successfully` });
    });
})


// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Untuk melayani file soal PDF atau HTML

// File penyimpanan data
const soalFile = "./data/soal.json";
const kunciFile = "./data/kunci.json";
const jawabanFile = "./data/jawaban.json";

// Endpoint untuk mengirim jawaban siswa
app.post("/submit-answer", (req, res) => {
    const { jawabanGanda, jawabanIsian } = req.body;

    // Baca kunci jawaban
    fs.readFile(kunciFile, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Gagal membaca kunci jawaban." });
            return;
        }

        const kunciJawaban = JSON.parse(data);

        // Penilaian
        let skorGanda = 0;
        let skorIsian = 0;

        // Cek jawaban pilihan ganda
        jawabanGanda.forEach((jawaban, index) => {
            if (jawaban.toUpperCase() === kunciJawaban.ganda[index]) {
                skorGanda++;
            }
        });

        // Cek jawaban isian singkat
        jawabanIsian.forEach((jawaban, index) => {
            if (jawaban.trim().toLowerCase() === kunciJawaban.isian[index].toLowerCase()) {
                skorIsian++;
            }
        });

        const totalSkor = skorGanda + skorIsian;

        // Simpan hasil siswa
        const hasilSiswa = {
            waktu: new Date().toISOString(),
            jawabanGanda,
            jawabanIsian,
            skorGanda,
            skorIsian,
            totalSkor,
        };

        fs.readFile(jawabanFile, (err, data) => {
            const allJawaban = err ? [] : JSON.parse(data);
            allJawaban.push(hasilSiswa);

            fs.writeFile(jawabanFile, JSON.stringify(allJawaban, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ message: "Gagal menyimpan jawaban." });
                    return;
                }
                res.json({ message: "Jawaban berhasil dikirim.", skor: totalSkor });
            });
        });
    });
});

// Endpoint untuk mengunduh soal PDF
app.get("/soal-pdf/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = `./public/${filename}`;

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath, { root: __dirname });
    } else {
        res.status(404).send("Soal tidak ditemukan.");
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

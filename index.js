const buku = "Local Storage Buku";
const submit = document.getElementById("input");
const render = "render";

if (typeof Storage !== "undefined") {
  window.addEventListener("load", function () {
    if (localStorage !== null) {
      document.dispatchEvent(new Event(render));
    }
  });

  function buatID() {
    return +new Date();
  }

  function generateBuku(id, title, author, year, isComplete) {
    return {
      id,
      title,
      author,
      year,
      isComplete,
    };
  }

  function memasuki_buku(data) {
    let data_buku = [];
    if (localStorage.getItem(buku) !== null) {
      data_buku = JSON.parse(localStorage.getItem(buku));
    }
    data_buku.unshift(data);
    localStorage.setItem(buku, JSON.stringify(data_buku));
    document.dispatchEvent(new Event(render));
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form_input = document.getElementById("input");
    submit.addEventListener("submit", function (event) {
      event.preventDefault();
      data();
      document.dispatchEvent(new Event(render));
      form_input.reset();
    });

    document.getElementById("search_button").addEventListener("click", function () {
      cariBuku();
    });
  });

  function data() {
    const title = document.getElementById("input_judul").value;
    const author = document.getElementById("input_penulis").value;
    const year = parseInt(document.getElementById("input_tahun").value);
    const isComplete = document.getElementById("status").checked;

    const id = buatID();
    const buku_baru = generateBuku(id, title, author, year, isComplete);

    memasuki_buku(buku_baru);
    document.dispatchEvent(new Event(render));
  }

  function tampilbuku(data) {
    const { id, title, author, year, isComplete } = data;

    const textjudul = document.createElement("h2");
    textjudul.innerText = title;

    const textpenulis = document.createElement("p");
    textpenulis.innerText = "Penulis  : " + author;

    const texttahun = document.createElement("p");
    texttahun.innerText = "Tahun    : " + year;

    const boxtext = document.createElement("div");
    boxtext.classList.add("boxtext");
    boxtext.append(textjudul, textpenulis, texttahun);

    const box = document.createElement("div");
    box.classList.add("box");
    box.append(boxtext);
    box.setAttribute("id", id);

    if (isComplete) {
      const btn_belum = document.createElement("button");
      btn_belum.classList.add("btn_belum");
      btn_belum.innerText = "Belum Selesai Dibaca";
      btn_belum.addEventListener("click", function () {
        pindah_belum(id);
      });

      const hapus = document.createElement("button");
      hapus.classList.add("btn_hapus");
      hapus.innerText = "Hapus dari List";
      hapus.addEventListener("click", function () {
        hapusbuku(id);
      });
      box.append(btn_belum, hapus);
    } else {
      const btn_selesai = document.createElement("button");
      btn_selesai.classList.add("btn_selesai");
      btn_selesai.innerText = "Selesai Dibaca";
      btn_selesai.addEventListener("click", function () {
        pindah_selesai(id);
      });

      const hapus = document.createElement("button");
      hapus.classList.add("btn_hapus");
      hapus.innerText = "Hapus dari List";
      hapus.addEventListener("click", function () {
        hapusbuku(id);
      });
      box.append(btn_selesai, hapus);
    }
    return box;
  }

  function cariBuku() {
    const query = document.getElementById("search_input").value.toLowerCase();
    const data_buku = JSON.parse(localStorage.getItem(buku));

    const hasil_pencarian = data_buku.filter(function (buku) {
      return buku.title.toLowerCase().includes(query);
    });

    const completed = document.getElementById("sudah_baca");
    const uncompleted = document.getElementById("belum_baca");

    completed.innerHTML = "";
    uncompleted.innerHTML = "";

    for (const books of hasil_pencarian) {
      const item = tampilbuku(books);
      if (books.isComplete) {
        completed.append(item);
      } else {
        uncompleted.append(item);
      }
    }
  }

  function cari_index(id) {
    const index_buku = JSON.parse(localStorage.getItem(buku));
    for (const index in index_buku) {
      if (index_buku[index].id === id) {
        return index;
      }
    }
  }

  function pindah_selesai(id) {
    const data_buku = JSON.parse(localStorage.getItem(buku));
    for (const data of data_buku) {
      if (data.id === id) {
        data.isComplete = true;
      }
    }
    localStorage.setItem(buku, JSON.stringify(data_buku));
    document.dispatchEvent(new Event(render));
  }

  function pindah_belum(id) {
    const data_buku = JSON.parse(localStorage.getItem(buku));
    for (const data of data_buku) {
      if (data.id === id) {
        data.isComplete = false;
      }
    }
    localStorage.setItem(buku, JSON.stringify(data_buku));
    document.dispatchEvent(new Event(render));
  }

  function hapusbuku(id) {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (konfirmasi) {
      const target = cari_index(id);
      const data_buku = JSON.parse(localStorage.getItem(buku));
      data_buku.splice(target, 1);
      localStorage.setItem(buku, JSON.stringify(data_buku));
      document.dispatchEvent(new Event(render));

      alert("Buku berhasil dihapus!");
    }
  }

  document.addEventListener(render, function () {
    const completed = document.getElementById("sudah_baca");
    const uncompleted = document.getElementById("belum_baca");

    completed.innerHTML = "";
    uncompleted.innerHTML = "";
    const data_buku = JSON.parse(localStorage.getItem(buku));
    for (const books of data_buku) {
      const item = tampilbuku(books);
      if (books.isComplete) {
        completed.append(item);
      } else {
        uncompleted.append(item);
      }
    }
  });
} else {
  alert('error, tidak mendukung "Local Storage"');
}

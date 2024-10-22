//--1 render song--->OK
//--2 scrolltop----->OK
//--3 play/pause/seek----->>OK
//--4 CD rotate--------->>OK
//--5 Next/prev-------->>>OK
//--6 andom----------->>>>OK
//--7 next /repeat when ended------>>
//--8 active song--------->>
//--9 Scroll active song into view---->>OK tức  là khi ngẫu nhiên tới bài hát nào thì nó sẽ tực center khung hình tới bài hát đó
//--10 play song when click
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playlist = $('.playlist')
const cd = $('.cd')
const btnPause = $('.btn-toggle-play')
const audio = $('#audio')
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const nextBnt = $('.btn-next')
const preveBnt = $('.btn-prev')
const progress = $('.progress')
const cdThumd = $('.cd-thumb')
const randomBnt = $('.btn-random')
const repeatBnt = $('.btn-repeat')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "văn sứ mới nổi",
            singer: "Raftaar x Fortnite",
            path: "./songs/song1.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./songs/song2.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path:
                "./songs/song3.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./songs/song4.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "./songs/song5.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "./songs/song6.mp3",
            image:
                "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./songs/song7.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./songs/song8.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./songs/song9.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
        ,
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./songs/song10.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
        ,


    ],


    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex]
            }
        })

    },

    render() {

        const htmls = this.songs.map((song, index) => {
            return ` <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        })
        playlist.innerHTML = htmls.join('')

    },
    handleEvent() {

        const _this = this

        const width = cd.offsetWidth//Dòng này lấy chiều rộng ban đầu của phần tử "cd" và lưu trữ nó vào biến "width".
        document.onscroll = function () {//Dòng này thiết lập một bộ lắng nghe sự kiện sẽ kích hoạt mỗi khi người dùng cuộn trang.
            const scrollTop = window.scrollY//Dòng này lấy vị trí cuộn dọc hiện tại của cửa sổ.
            const newWidth = width - scrollTop//Dòng này tính toán chiều rộng mới -cho phần tử cd bằng cách "trừ" vị trí cuộn hiện tại từ chiều rộng ban đầu.

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            //Nếu newWidth lớn hơn 0, nó sẽ thiết lập chiều rộng của cd thành newWidth. 
            //Nếu newWidth bằng 0 hoặc nhỏ hơn, nó sẽ thiết lập chiều rộng thành 0, hiệu quả là ẩn nó đi.
            cd.style.opacity = newWidth / width
            // Dòng này thiết lập độ mờ của cd dựa trên tỷ lệ giữa newWidth và chiều rộng ban đầu. 
            // Khi người dùng cuộn xuống, độ mờ giảm, làm cho phần tử dần dần biến mất.
        }

        btnPause.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }

        }
        //xử lý sự kiện bấm vào onplay
        audio.onplay = function () {
            player.classList.add('playing')
            _this.isPlaying = true
            cdThumbanomate.play()

        }

        // //xử lý sự kiện bấm vào onpause
        audio.onpause = function () {
            player.classList.remove('playing')
            _this.isPlaying = false
            cdThumbanomate.pause()
        }

        //xử lý suwk kiện bntNext
        nextBnt.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomsong()
            } else {
                _this.Nextsong()
            }
            audio.play()
            _this.render()//render ở đây ở active nó nhảy qua bài  hát mới
            _this.ScrolltoActivesong()
        }

        //xử lý suwk kiện bntNext
        preveBnt.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomsong()
            } else {
                _this.Prevesong()
            }
            audio.play()
            _this.render()//render ở đây ở active nó nhảy qua bài  hát mới
            _this.ScrolltoActivesong()
        }

        //xử lý sự kiện timeupdate---khi tiến độ bài hát thay đổi
        //có chức năng theo dõi tiến trình phát audio và cập nhật thanh tiến độ (progress bar)

        //Đây là một sự kiện được kích hoạt mỗi khi thời gian hiện tại của audio thay đổi.
        // Điều này có nghĩa là mỗi khi audio phát, hàm này sẽ được gọi.
        audio.ontimeupdate = function () {
            //Kiểm tra xem thuộc tính duration của audio có giá trị hay không. 
            //duration là tổng thời gian của audio, và nếu nó có giá trị, đoạn mã tiếp theo sẽ được thực hiện.        
            if (audio.duration) {
                // Tính toán phần trăm thời gian đã phát của audio.
                // audio.currentTime là thời gian hiện tại mà audio đang phát.
                // audio.duration là tổng thời gian của audio.
                // Phép chia audio.currentTime / audio.duration cho biết tỷ lệ giữa thời gian đã phát và tổng thời gian.
                // Nhân với 100 để chuyển đổi thành phần trăm, và sử dụng Math.floor để làm tròn xuống đến số nguyên gần nhất.    
                const progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPersent
            }
        }

        //xử lý nút tua theo thời gian bài hát
        //Đặt một hàm xử lý sự kiện cho sự kiện change trên phần tử progress. 
        //Sự kiện này sẽ được kích hoạt khi người dùng thay đổi giá trị của thanh tiến độ (khi họ kéo hoặc tua thanh).
        progress.onchange = function (e) {
            const seeksong = audio.duration / 100 * e.target.value
            audio.currentTime = seeksong
        }


        //xử lý xoay đĩa CD
        //Gọi phương thức animate trên phần tử cdThumb, tạo một hoạt ảnh cho nó.
        //cdThumb thường là một phần tử HTML (ví dụ: một hình ảnh của đĩa CD).
        //Đây là mảng chứa các keyframe cho hoạt ảnh. Trong trường hợp này, nó chỉ có một keyframe duy nhất, làm cho phần tử quay 360 độ.
        //transform: 'rotate(360deg)' chỉ định rằng phần tử sẽ được quay một vòng hoàn chỉnh.
        const cdThumbanomate = cdThumd.animate([{ transform: 'rotate(360deg)' }],
            // Đây là một đối tượng chứa các tùy chọn cho hoạt ảnh:
            // duration: 10000: Đặt thời gian cho hoạt ảnh là 10 giây (10.000 milliseconds) để quay một vòng.
            // iterations: Infinity: Đặt số lần lặp lại của hoạt ảnh là vô hạn, có nghĩa là hoạt ảnh sẽ tiếp tục quay mãi mãi cho đến khi dừng lại.
            {
                duration: 10000,
                interations: Infinity
            })
        cdThumbanomate.pause()


        //xử lý sự kiện khi click vô nut repeat
        repeatBnt.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            repeatBnt.classList.toggle('active', _this.isRepeat)
        }

        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBnt.click()//tự động click 
            }
        }





        //xử lí sự kiện random
        randomBnt.onclick = function () {
            _this.isRandom = !_this.isRandom
            randomBnt.classList.toggle('active', _this.isRandom)
        }


        //xử lý sự kiện khi onclick vào playlist bài hát nào thì bài hát đó sẽ được hoạt động
      
        playlist.onclick=function(e){
            const song=e.target.closest('.song:not(.active)')
            const option=e.target.closest('.option')
        //xử lý sự kiện click vào bài hát
          if(song||option){
            if(song){
                _this.currentIndex=Number(song.dataset.index)
                //chú ý đoạn này khi gắn cho nó giá trị thì nó tự động chuyển qua chuỗi ,nên phải convert qua number
                _this. LoadcurrentSong()
                audio.play()
                _this.render()
            }
            
          }

        }





    },

    LoadcurrentSong() {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path


    },

    Nextsong() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.LoadcurrentSong()

    },

    Prevesong() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }

        this.LoadcurrentSong()
    },
    playRandomsong() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)

        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.LoadcurrentSong()

    },

    ScrolltoActivesong(){
        setTimeout(()=>{
          $('.song.active').scrollIntoView({
            behavior :'smooth',
            block:'center',
            inline:'nearest'
          })
        },250)
    },

    start() {
        this.defineProperties()

        this.handleEvent()
        this.LoadcurrentSong()
        this.render()

    }


}
app.start()




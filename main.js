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
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBnt = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBnt = $('.btn-next')
const prevBnt = $('.btn-prev')
const random = $('.btn-random')
const repeat =$('.btn-repeat')
const playlist = $('.playlist')




const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [
        {
            name: "văn sứ mới nổi",
            singer: "Raftaar x Fortnite",
            path: "./songs/song2.mp3",
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
        }
    ],

    // set config for app


    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex]
            }
        })

    },


    render() {
        const htmls = this.songs.map( (song,index)=> {//thằng này sử dụng arraw function thì thằng bên trong phải \
                                                      //sử dụng cú pháp của ES6+ thì nó mới chấp thuận  
             //     <div class="song ${index === this.currentIndex ? 'active' : ''}"> dùng để active song                                         
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
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
            </div>
        `
        })
       
        playlist.innerHTML = htmls.join('')
    },
    handleEvent() {



        const _this = this
        //xử lí phóng to / thu nhỏ CD  
        const width = cd.offsetWidth
        document.onscroll = function () {//document.onscroll là kéo lên hoặc kéo xuống cả trang document đang thực thi
            const scrolltop = window.scrollY || document.documentElement.scrollTop
            const newWidth = width - scrolltop

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0//gắn chiều rộng của thằng newWidth cho "cd"
            cd.style.opacity = newWidth / width; //tạo hiệu ứng mờ dần

        }

        //xử lý CD khi quay và khi dừng
        const cdThumbanomate = cdThumb.animate(
            [{ transform: 'rotate(360deg)' }],
            {
                duration: 10000,//10 giây
                interations: Infinity // đây là lặp vô hạn 
            })

        cdThumbanomate.pause()

        //xử lý sự  kiện khi nhấn nút play  
        playBnt.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        //xử lý sự kiện khi onplay
        audio.onplay = function () {
            player.classList.add('playing')
            _this.isPlaying = true
            cdThumbanomate.play()
        }

        //xử lý sự kiện khi onpause
        audio.onpause = function () {
            player.classList.remove('playing')
            _this.isPlaying = false
            cdThumbanomate.pause()
        }

        //xử lý sự kiện timeupdate---khi tiến độ bài hát thay đổi
        //có chức năng theo dõi tiến trình phát audio và cập nhật thanh tiến độ (progress bar)

        //Đây là một sự kiện được kích hoạt mỗi khi thời gian hiện tại của audio thay đổi.
        // Điều này có nghĩa là mỗi khi audio phát, hàm này sẽ được gọi.
        audio.ontimeupdate = function () {
       //Kiểm tra xem thuộc tính duration của audio có giá trị hay không. 
       //duration là tổng thời gian của audio, và nếu nó có giá trị, đoạn mã tiếp theo sẽ được thực hiện.     
            if (audio.duration) {
                const progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPersent;//Đoạn mã này nhằm mục đích gán giá trị phần trăm vào thuộc tính 
                //value của một phần tử, có thể là thanh tiến độ (progress bar).
            }

        }

        //xử lý khi song -khi tua song
        progress.onchange = function (e) {
            const seeksong = audio.duration / 100 * e.target.value
            audio.currentTime = seeksong
        }

        //xử lý sự kiện khi bấm next bài hát
        nextBnt.onclick = function () {
            if(_this.isRandom){
                _this.playRandomsong()
            }else{
                _this.netxsong()
            }
            audio.play()
            _this.render()
            _this.ScrolltoActivesong()
        }

        //xử lý sự kiện khi bấm preve bài hát
        prevBnt.onclick = function () {
            if(_this.isRandom){
                _this.playRandomsong()
            }else{
                _this.Prevesong()
            }
            audio.play()
            _this.render()
            _this.ScrolltoActivesong()
        }

        //xử lý sự kiện random thì sẽ nhảy bài vào không cho phép nhảy lại bài cũ
        random.onclick = function () {
            _this.isRandom = !_this.isRandom
            random.classList.toggle('active', _this.isRandom)//học lại thuộc tính toggle
        }

        //xử lý khi audio ended thì phải next bài mới
        audio.onended=function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBnt.click()
            }
          
        }

        //xử lý hàm lặp lại bài hát ,tức là khi kết thúc thì sẽ lặp lại bài hát
        repeat.onclick=function(){
            _this.isRepeat=!_this.isRepeat
            repeat.classList.toggle('active',_this.isRepeat)

        }

        //lắng nghe hành vi bấm vào playlist
        playlist.onclick=e=>{
            const songElement=e.target.closest('.song:not(.active)')
            const option=e.target.closest('.option')
            //xử lí khi click vào song
           if(songElement||option){
            if(songElement){
               _this.currentIndex=Number(songElement.dataset.index)
               _this.LoadcurrentSong()
               _this.render()
               audio.play()
            }

            if(option){

            }
           }
        }


    },
    LoadcurrentSong() {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path


    },
    netxsong() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.LoadcurrentSong()


    },
    Prevesong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.LoadcurrentSong()
    },
    ScrolltoActivesong(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior :'smooth',
                block :'center'
            })
        },200)
      
    },
    playRandomsong() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)

        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.LoadcurrentSong()

    },

    start() {
        //định nghĩa các thuộc tính cho objetc
        this.defineProperties()

        //lắng nghe /xử lí các sự kiện DOM   
        this.handleEvent()

        //tải thông tin bài hát đầu tiên vào UI khi chạy ứng ựng
        this.LoadcurrentSong()

        //render htmls
        this.render()


    }
}
app.start()
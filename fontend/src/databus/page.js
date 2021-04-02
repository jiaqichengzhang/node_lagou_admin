class Page{
    constructor() {
        this.pageCount = 5
        this.currPage = 1
    }
    setCurrPage(page){
        this.currPage = page
    }
}
export default new Page()

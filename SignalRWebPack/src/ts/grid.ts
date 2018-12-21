type typeContainer = HTMLDivElement;
type typeScrollbar = HTMLDivElement;
type typeRow = HTMLDivElement;

export interface ICellContent {
    text: string
}

export interface ISuperGridConfig {
    gridWidth: number,
    gridHeight: number,
    rowHeight: number,
    cells: Array<ICellContent>
} 

export class SuperGrid {
    private config: ISuperGridConfig;
    private container: typeContainer;
    private verticalScroller: typeScrollbar;
    private cachedItemsFactor: number;
    private lastRepaintY: number;
    private lastScrolled: number;
    private rmNodeInterval: number;
    

    constructor(config: ISuperGridConfig) {
        this.config = config;
        this.lastScrolled = 0;

        this.lastRepaintY = 0;
        this.cachedItemsFactor = 3;

        this.createVerticalScroller();
        this.createContainer();
        this.container.appendChild(this.verticalScroller);
        this.container.addEventListener('scroll', this.onScroll.bind(this));
        this.renderChunk(this.container, 0);

        this.rmNodeInterval = setInterval(function () {
            if (Date.now() - this.lastScrolled > 100) {
                var badNodes = document.querySelectorAll('[data-rm="1"]');
                for (var i = 0, l = badNodes.length; i < l; i++) {
                    this.container.removeChild(badNodes[i]);
                }
            }
        }, 300);
    }

    getContainer(): typeContainer { return this.container; }

    onScroll(e) {
        const scrollTop: number = e.target.scrollTop; 
        const numRowsOnScreen: number = Math.ceil(this.config.gridHeight / this.config.rowHeight);
        const maxBuffer: number = numRowsOnScreen * this.config.rowHeight;

        if (Math.abs(scrollTop - this.lastRepaintY) > maxBuffer) {
            const first: number = (scrollTop / this.config.rowHeight) - numRowsOnScreen;

            this.renderChunk(this.container, first < 0 ? 0 : first);

            this.lastRepaintY = scrollTop;
        }

        this.lastScrolled = Date.now();
        e.preventDefault && e.preventDefault();
    }

    renderChunk(node: Node, from: number): void {

        const numRowsOnScreen: number = Math.ceil(this.config.gridHeight / this.config.rowHeight);
        const numRowsCached: number = numRowsOnScreen * this.cachedItemsFactor;

        let finalItem: number = from + numRowsCached;

        if (finalItem > this.config.cells.length)
            finalItem = this.config.cells.length;

        // Append all the new rows in a document fragment that we will later append to the parent node
        let fragment: DocumentFragment = document.createDocumentFragment();

        for (var index = from; index < finalItem; index++) {
            fragment.appendChild(this.createRow(index));
        }

        // Hide and mark obsolete nodes for deletion.
        for (var j = 1, l = node.childNodes.length; j < l; j++) {
            let child: HTMLDivElement = node.childNodes[j] as HTMLDivElement;
            child.style.display = 'none';
            child.setAttribute('data-rm', '1');
        }
        node.appendChild(fragment);
    }

    createRow(index: number): typeRow  {

        let row: typeRow = document.createElement('div');

        row.style.height = this.config.rowHeight + 'px';
        row.appendChild(document.createTextNode(this.config.cells[index].text));

        row.classList.add('vrow');
        row.style.position = 'absolute';
        row.style.top = (index * this.config.rowHeight) + 'px';
        return row;
    }

    createContainer():void {
        this.container = document.createElement('div');
        let cStyle: CSSStyleDeclaration = this.container.style;
        cStyle.width = (this.config.gridWidth > 0) ? String(this.config.gridWidth) + 'px' : '100%';
        cStyle.height = (this.config.gridHeight> 0) ? String(this.config.gridHeight) + 'px' : '100%';
        cStyle.overflow = 'auto';
        cStyle.position = 'relative';
        cStyle.padding = '';
        cStyle.border = '1px solid black';
    }
    createVerticalScroller(): void {
        this.verticalScroller = document.createElement('div');
        let sStyle: CSSStyleDeclaration = this.verticalScroller.style;
        sStyle.opacity = '';
        sStyle.position = 'absolute';
        sStyle.top = '';
        sStyle.left = '';
        sStyle.width = '1px';
        sStyle.height = String(this.config.cells.length * this.config.rowHeight) + 'px';
    };
};

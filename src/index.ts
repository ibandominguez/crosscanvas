export default class CrossCanvas {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  get width (): number {
    return this.canvas.width
  }

  set width (width: number) {
    this.canvas.width = width
  }

  get height (): number {
    return this.canvas.height
  }

  set height (height: number) {
    this.canvas.height = height
  }

  constructor ({
    width = 100,
    height = 100
  }: {
    width?: number,
    height?: number
  }) {
    this.canvas = document.createElement('canvas') as any
    this.context = this.canvas.getContext('2d') as any
    this.width = width
    this.height = height
  }

  public getCanvas () : HTMLCanvasElement {
    return this.canvas
  }

  public getContext () : CanvasRenderingContext2D {
    return this.context
  }

  public addText ({
    top = 0,
    left = 0,
    text = 'TextProperty',
    color = 'black',
    font = 'Helvetica',
    size = 18
  }: {
    top?: number,
    left?: number,
    text?: string,
    color?: 'black' | 'white' | 'red',
    font?: string,
    size?: number
  }): CrossCanvas {
    this.context.font = `${size}px ${font}`
    this.context.fillStyle = color
    this.context.textBaseline = 'top'
    this.context.textAlign = 'left'
    this.context.fillText(text, left, top)
    return this
  }

  public addRectangle ({
    top = 0,
    left = 0,
    width = 10,
    height = 10,
    color = 'black'
  }: {
    top?: number,
    left?: number,
    width?: number,
    height?: number,
    color?: 'black' | 'white' | 'red'
  }): CrossCanvas {
    this.context.fillStyle = color
    this.context.fillRect(left, top, width, height)
    return this
  }

  public addImage ({
    top = 0,
    left = 0,
    width = 100,
    height = 100,
    source = 'https://fakeimg.pl/100x100/'
  }: {
    top?: number,
    left?: number,
    width?: number,
    height?: number,
    source?: string
  }): CrossCanvas {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = source
    image.width = width
    image.height = height
    image.onload = () => this.context.drawImage(image, left, top, width, height)
    return this
  }

  public addImageAsync ({
    top = 0,
    left = 0,
    width = 100,
    height = 100,
    source = 'https://fakeimg.pl/100x100/'
  }: {
    top?: number,
    left?: number,
    width?: number,
    height?: number,
    source?: string
  }): Promise<CrossCanvas> {
    return new Promise(resolve => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = source
      image.width = width
      image.height = height
      image.onload = () => {
        this.context.drawImage(image, left, top, width, height)
        resolve(this)
      }
    })
  }
}

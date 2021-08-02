import CrossCanvas from '../src'

test('CrossCanvas instanciates', () => {
  expect(new CrossCanvas({ width: 150, height: 100 })).toBeInstanceOf(CrossCanvas)
})

test('CrossCanvas updates canvas width', () => {
  const crossCanvas = new CrossCanvas({ width: 150, height: 100 })
  expect(crossCanvas.getCanvas().width).toBe(150)

  crossCanvas.width = 300
  expect(crossCanvas.getCanvas().width).toBe(300)
})

test('CrossCanvas methods', () => {
  new CrossCanvas({
    width: 200,
    height: 100
  }).addText({
    top: 1,
    left: 1,
    text: 'HelloWorld',
    color: 'black'
  }).addRectangle({
    top: 50,
    left: 50,
    width: 50,
    height: 50,
    color: 'red'
  }).addImage({
    top: 100,
    left: 30,
    source: 'https://fakeimg.pl/100x100/'
  }).addImageAsync({
    top: 100,
    left: 30,
    source: 'https://fakeimg.pl/100x100/'
  }).then(crossCanvas => {
    expect(crossCanvas).toBeInstanceOf(CrossCanvas)
  })
})

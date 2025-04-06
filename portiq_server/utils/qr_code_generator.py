import segno

def generate_qr_code(data: str):
    print("qr code")
    qr_code = segno.make_qr(data)
    qr_code.save("qr_code.png")

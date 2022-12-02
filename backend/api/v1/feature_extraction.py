import cv2
import os

def feature_extra(target):
# ターゲットのファイル名
    TARGET_FILE = target
    # ターゲットの画像が保管されているディレクトリ
    TARGET_IMG_DIR = '/src/girls_img/'
    IMG_SIZE = (200, 200)

    ACTOR_DIR = '/src/girls_actors_img/'

    # ターゲットのファイルフルパス
    target_img_path = TARGET_IMG_DIR + TARGET_FILE + '.jpeg'

    # ターゲット画像をグレースケールで読み出し、200*200に変換する
    target_img = cv2.imread(target_img_path, cv2.IMREAD_GRAYSCALE)
    target_img = cv2.resize(target_img, IMG_SIZE)

    # BFMatcherオブジェクトの生成
    bf = cv2.BFMatcher(cv2.NORM_HAMMING)

    # AKAZEを適用、特徴点を検出
    detector = cv2.AKAZE_create()
    (target_kp, target_des) = detector.detectAndCompute(target_img, None)

    print('TARGET_FILE: %s' % (TARGET_FILE))

    # 類似度の高い順に比較先IDを保存する配列を用意
    result_list = []

    # 比較先のディレクトリ以下のファイルをリストに変換
    files = os.listdir(ACTOR_DIR)
    # 比較先とターゲット写真の特徴点を検出
    for file in files:
        comparing_img_path = ACTOR_DIR + file

        try:
            comparing_img = cv2.imread(comparing_img_path, cv2.IMREAD_GRAYSCALE)
            comparing_img = cv2.resize(comparing_img, IMG_SIZE)
            (comparing_kp, comparing_des) = detector.detectAndCompute(comparing_img, None)

            # BFMatcherで総当たりマッチングを行う
            matches = bf.match(target_des, comparing_des)

            # 特徴量の距離を出し、平均を取る。平均が小さい方が類似度が高いとする。
            dist = [m.distance for m in matches]
            ret = sum(dist) / len(dist)
            # リストに特徴量, ファイルネームの.jpegを消して追加する。[特徴量,女優名]
            result_list.append([ret, file.split('.')[0]])

        # エラーが出た場合は飛ばす
        except cv2.error:
            continue

    # 値が小さい順でソート。ターゲットと似ている顔順の配列[特徴量,女優名]を返す
    return sorted(result_list)

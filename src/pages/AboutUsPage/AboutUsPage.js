import classNames from "classnames/bind";
import styles from "./AboutUsPage.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Navigation from "~/components/Navigation";

import { useTranslation } from "react-i18next";

function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <div className={cx("container")}>
      <div className={cx("frame")}>
        <div className={cx("back")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <div className={cx("introduces")}>
          <h2 className={cx("title")}>Về chúng tôi</h2>
          <p className={cx("desc")}>
            <strong>SnapifyTunes</strong> ra đời với mong muốn trở thành một nền
            tảng âm nhạc trực tuyến, nơi mọi người dễ dàng tiếp cận những bài
            hát yêu thích, khám phá giai điệu mới và tận hưởng âm nhạc theo cách
            riêng. Chúng tôi luôn cố gắng xây dựng trải nghiệm nghe nhạc hiện
            đại, cá nhân hoá và phù hợp với từng tâm trạng của người dùng.
          </p>

          <p className={cx("desc")}>
            <strong>SnapifyTunes</strong> sáng lập bởi Cinzogoni (Thái Chí Huy)
            - người Việt Nam với niềm đam mê âm nhạc và công nghệ. Với tinh thần
            đầy nhiệt huyết và sáng tạo. Anh và đội ngũ luôn không ngừng đổi mới
            với nhiều tính năng, trải nghiệm tốt hơn cho người dùng như kho nhạc
            đa dạng nhiều thể loại, phong cách, tâm trạng từ nhiều nghệ sĩ khác
            nhau. Playist cá nhân hoá để phù hợp với sở thích của bạn. Cập nhật
            các khoảnh khắc trong ngành giải trí âm nhạc để người dùng có thêm
            nhiều thông tin hữu ích.
          </p>

          <p className={cx("desc")}>
            <strong>SnapifyTunes</strong> không chỉ là nơi bạn tìm kiếm âm nhạc,
            mà còn là nơi kết nối cảm xúc. Chúng tôi luôn nổ lực để trở thành
            người bạn đồng hành cùng bạn trong mọi khoảnh khắc cuộc sống, từ
            những giây phút rộn ràng niềm vui đến những khoảng lặng sâu lắng.
          </p>
        </div>
      </div>
      <div className={cx("copy-right")}>
        <h1 className={cx("text")}>
          © 20xx SnapifyTunes. All rights reserved.
        </h1>
        <p className={cx("version")}>Version 1.0.0</p>
      </div>
    </div>
  );
}

export default AboutUsPage;

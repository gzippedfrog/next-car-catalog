import classNames from "classnames";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import img1 from "../public/images/img1.webp";
import img2 from "../public/images/img2.webp";

import "swiper/css";
import styles from "../styles/CarCard.module.scss";

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function CarCard(props) {
  const {
    item: {
      feedData: {
        brandName,
        modelName,
        equipmentVariantName,
        modelYear,
        vin,
        equipmentVariantEngineCapacity,
        equipmentVariantEnginePower,
        equipmentVariantFuelType,
        equipmentVariantTransmissionType,
        autoProbeg,
        colorByClassifierName,
        autoPrice,
        baseOptions,
        status
      }
    }
  } = props;

  const hasOptions = !!baseOptions[0].universalOptions;

  const isSold = status == "Продан";

  const btnStyles = classNames(styles.buyBtn, {
    [styles.buyBtnOrder]: status == "Заказ",
    [styles.buyBtnSold]: isSold
  });

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <span className={styles.model}>
          {`${brandName} ${modelName} ${equipmentVariantName}`}
        </span>
        <sup className={styles.year}>{modelYear}</sup>
      </div>

      <div className={styles.vin}>{vin}</div>
      <Swiper
        className={styles.imageSlider}
        slidesPerView={"auto"}
        spaceBetween={12}
      >
        <SwiperSlide className={styles.imageSlide}>
          <Image src={img1} className={styles.image} />
        </SwiperSlide>
        <SwiperSlide className={styles.imageSlide}>
          <Image src={img2} className={styles.image} />
        </SwiperSlide>
      </Swiper>

      <div className={styles.infoItem}>
        <div className={styles.infoItemTitle}>Двигатель</div>
        <div className={styles.infoItemValue}>
          {`${equipmentVariantEngineCapacity / 1000} л`}
          <span className={styles.separator} />
          {`${equipmentVariantEnginePower} лс`}
          <span className={styles.separator} />
          {equipmentVariantFuelType}
        </div>
      </div>

      <div className={classNames(styles.infoItem, styles.transmissionType)}>
        <div className={styles.infoItemTitle}>КПП</div>
        <div className={styles.infoItemValue}>
          {equipmentVariantTransmissionType}
        </div>
      </div>

      {!!autoProbeg && (
        <div className={classNames(styles.infoItem, styles.mileage)}>
          <div className={styles.infoItemTitle}>Пробег</div>
          <div className={styles.infoItemValue}>
            {`${formatNumber(autoProbeg)} км`}
          </div>
        </div>
      )}

      <div className={classNames(styles.infoItem, styles.color)}>
        <div className={styles.infoItemTitle}>Цвет</div>
        <div className={styles.infoItemValue}>{colorByClassifierName}</div>
      </div>

      {hasOptions && (
        <div className={classNames(styles.infoItem, styles.options)}>
          <div className={styles.infoItemTitle}>Пакеты</div>
          <div className={styles.infoItemValue}>
            <div className={styles.optionName}>
              {baseOptions[0].universalOptions?.uniOptionName}
            </div>
            <div className={styles.otherOptions}>
              {`(+ еще ${baseOptions.length - 1} пакета)`}
            </div>
          </div>
        </div>
      )}

      <span className={styles.prices}>
        <span className={styles.carPrice}>{formatNumber(autoPrice)}</span>
        <div className={styles.options}>
          Доп. опции на <span className={styles.optionsPrice}>999 999</span>
        </div>
      </span>
      <FontAwesomeIcon className={styles.favBtn} icon={faHeart} />
      <button className={btnStyles} disabled={isSold} />
    </div>
  );
}

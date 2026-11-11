// 原 ZooopLogo 的内联 SVG 与旋转动画已替换为单张图片渲染。
// 保留组件名与 props 签名 => Resume.tsx 的 import、group.logo 判断、数据、类型均无需改动。
// animated 在解构时被显式吃掉，不透传给 <img>，避免 React unknown-prop 警告。
export function ZooopLogo({ animated = false, ...props }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/bp.png`}
      alt="BGI"
      {...props}
    />
  );
}

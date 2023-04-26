import React from "react";
import styles from "./Details.module.scss";
import { useNavigate } from "react-router-dom";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import unsplash from "../../assets/unsplash.png";
import unsplash2 from "../../assets/unsplash2.png";
import Footer from "../../components/Footer";

const Details = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className={styles.Rectangle1}></div>
      <button onClick={() => navigate("/")}>
                           
      <img className={styles.vector2} alt="Vector" src={vector2} />
      <p className={styles.classABCD}>classABCD</p>
      <p className={styles.learning}>Learning Center</p>
      </button>
      <div className={styles.Rectangle30}></div>
      <div className={styles.Rectangle33}></div>
      <button className={styles.Scolarship}>Scolarship</button>
      <button className={styles.Amharic}>Amharic</button>
      <button className={styles.English}>English</button>
      <button className={styles.Chinese}>Chinese</button>
      <button onClick={() => navigate("/search")}>
        <div className={styles.Rectangle36}></div>
        <img className={styles.vector3} alt="Vector" src={vector3} />
      </button>
      <img className={styles.vector4} alt="Vector" src={vector4} />
      <p className={styles.Language}>Language </p>
      <img className={styles.unsplash2} alt="unsplash2" src={unsplash2} />
      <div className={styles.Rectangle48}> </div>
      <p className={styles.EnglishPro}> English pronouncation</p>
      <div className={styles.Rectangle49}> </div>
      <div className={styles.Rectangle50}> </div>
      <p className={styles.Apply}> Apply </p>
      <p className={styles.Mostpopular}> Most popular </p>
      <div className={styles.Frame13}>
        <img className={styles.unsplash} alt="unsplash" src={unsplash} />

        <p className={styles.EnglishWriting}> English Writing </p>
        <p className={styles.TheclassABCD}>
          {" "}
          The classABCD is an online language education website teaching English
          and Chinese. It is the best platform to learn English, Chinese and
          many other languages{" "}
        </p>
      </div>
      <p className={styles.EnglishPro2}> English pronouncation</p>
      <div className={styles.Rectangle51}>
        <p className={styles.Messi}>
          {" "}
          Messi began football at a young age and his potential was quickly seen
          by Barcelona. He left Newell's Old Boys' youth team in September 2000
          and moved with his family to Europe in February 2001. He officially
          signed with Barcelona in December 2000 on a napkin. They moved to
          Spain because Barcelona offered their help to treat his growth hormone
          deficiency, and Newell's didn't offer any help.[9] Messi played his
          first professional match at 16 years old on 16 November 2003 against
          Porto. He played the 2003-04 season with the Barcelona B team. He was
          promoted to the A team for the 2004-05 season, and made his league
          debut on 16 October 2004 against Espanyol as a substitute. He made his
          league debut at age 17, and became the youngest player to play for
          Barcelona's first team in an official competition. He scored his first
          professional goal on 1 May 2005 against Albacete Balompie from a
          sublime assist by Ronaldinho. The goal made him the youngest-ever
          scorer for the club at that time. Barcelona won the La Liga that
          season for the first time in 6 years, and won the league for a second
          time in a row along with the Spanish Super Cup and UEFA Champions
          League in 2006. His first breakthrough season was in the 2006–07
          season; he became a first team regular by scoring his first hat-trick
          of his career in El Clásico. On 18 April 2007, he scored a goal almost
          exactly identical to Maradona's "Goal of the Century" against England
          in the 1986 World Cup, where Maradona got the ball behind the halfway
          line on the right side and beat 4 defenders and the goalie to score.
          Messi's goal was similar to this; he received a pass from Xavi on the
          right side behind half-field, and then nut-megged an opponent and 4
          others including the goalie before finishing off with his right foot
          inside the penalty box.[10] In 2019, Barcelona fans voted it as the
          best goal in the club's history, receiving 45% of votes.[11] After
          Ronaldinho left the club at the end of the 2007-08 season, Messi was
          handed the number 10 shirt. The 2008-09 season was arguably one of the
          most successful seasons in his stellar career. In this season, Messi
          scored 38 goals in all competitions, including one in the Champions
          League final against Manchester United that Barcelona won 2–0 as part
          of their treble. In the following 2009–10 season, Messi scored 47
          goals in all competitions. That levelled to Ronaldo Nazario's record
          total for Barcelona. Messi also won his first Ballon d'Or in December
          2009, and also won his second a year later. He scored again in the
          2011 Champions League final against their same opponent two years
          earlier, Manchester United. Barcelona won 3-1. Messi won his third
          Ballon d'Or in a row that year.
        </p>
      </div>
      <div className={styles.Rectangle52}>
        <p className={styles.Messi}>
          {" "}
          Messi began football at a young age and his potential was quickly seen
          by Barcelona. He left Newell's Old Boys' youth team in September 2000
          and moved with his family to Europe in February 2001. He officially
          signed with Barcelona in December 2000 on a napkin. They moved to
          Spain because Barcelona offered their help to treat his growth hormone
          deficiency, and Newell's didn't offer any help.[9] Messi played his
          first professional match at 16 years old on 16 November 2003 against
          Porto. He played the 2003-04 season with the Barcelona B team. He was
          promoted to the A team for the 2004-05 season, and made his league
          debut on 16 October 2004 against Espanyol as a substitute. He made his
          league debut at age 17, and became the youngest player to play for
          Barcelona's first team in an official competition. He scored his first
          professional goal on 1 May 2005 against Albacete Balompie from a
          sublime assist by Ronaldinho. The goal made him the youngest-ever
          scorer for the club at that time. Barcelona won the La Liga that
          season for the first time in 6 years, and won the league for a second
          time in a row along with the Spanish Super Cup and UEFA Champions
          League in 2006. His first breakthrough season was in the 2006–07
          season; he became a first team regular by scoring his first hat-trick
          of his career in El Clásico. On 18 April 2007, he scored a goal almost
          exactly identical to Maradona's "Goal of the Century" against England
          in the 1986 World Cup, where Maradona got the ball behind the halfway
          line on the right side and beat 4 defenders and the goalie to score.
          Messi's goal was similar to this; he received a pass from Xavi on the
          right side behind half-field, and then nut-megged an opponent and 4
          others including the goalie before finishing off with his right foot
          inside the penalty box.[10] In 2019, Barcelona fans voted it as the
          best goal in the club's history, receiving 45% of votes.[11] After
          Ronaldinho left the club at the end of the 2007-08 season, Messi was
          handed the number 10 shirt. The 2008-09 season was arguably one of the
          most successful seasons in his stellar career. In this season, Messi
          scored 38 goals in all competitions, including one in the Champions
          League final against Manchester United that Barcelona won 2–0 as part
          of their treble. In the following 2009–10 season, Messi scored 47
          goals in all competitions. That levelled to Ronaldo Nazario's record
          total for Barcelona. Messi also won his first Ballon d'Or in December
          2009, and also won his second a year later. He scored again in the
          2011 Champions League final against their same opponent two years
          earlier, Manchester United. Barcelona won 3-1. Messi won his third
          Ballon d'Or in a row that year.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Details;

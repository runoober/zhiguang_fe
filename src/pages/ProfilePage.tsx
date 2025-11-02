import { useMemo } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import MainHeader from "@/components/layout/MainHeader";
import SectionHeader from "@/components/common/SectionHeader";
import { mockContents } from "@/data/content";
import AuthStatus from "@/features/auth/AuthStatus";
import { useAuth } from "@/context/AuthContext";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const displayName = user?.nickname ?? user?.phone ?? user?.email ?? "知光用户";
  const avatarInitial = displayName.trim().charAt(0) || "知";

  const myContents = useMemo(
    () => mockContents.filter(item => item.mentor.id === "kana"),
    []
  );

  return (
    <AppLayout
      header={
        <MainHeader
          headline="我的知光主页"
          subtitle="完善个人信息，积累你的知识资产"
          rightSlot={<AuthStatus />}
        />
      }
    >
      <>
        <SectionHeader
          title="个人信息"
          subtitle="让同学们更快认识你"
          actions={<Link to="/profile/edit" className="ghost-button">编辑资料</Link>}
        />
        <div className={styles.profileGrid}>
          <div className={styles.avatarBox}>
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" className={styles.avatarImg} />
            ) : (
              <span>{avatarInitial}</span>
            )}
          </div>
          <div className={styles.infoBox}>
            <div className={styles.nickname}>{displayName}</div>
            <div className={styles.tags}>
              {user?.skills && user.skills.length > 0 ? (
                user.skills.map(tag => <span key={tag}>{tag}</span>)
              ) : (
                <span>未设置</span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.bioBlock}>{user?.bio ?? "暂无简介"}</div>

        <SectionHeader title="我的内容" subtitle="管理你的作品，了解互动和数据" />
        <ul className={styles.contentList}>
          {myContents.map(item => (
            <li key={item.id} className={styles.contentItem}>
              <div className={styles.contentMeta}>
                <Link to={`/course/${item.id}`} className={styles.contentTitle}>{item.title}</Link>
                <div className={styles.contentStats}>
                  <span>👁️ {item.views} 次浏览</span>
                  <span>🛒 0 次购买</span>
                  <span>👍 {item.likes} 次点赞</span>
                </div>
              </div>
              <div className={styles.contentActions}>
                <button type="button" className={styles.smallButton}>编辑</button>
                <button type="button" className={`${styles.smallButton} ${styles.danger}`}>删除</button>
              </div>
            </li>
          ))}
        </ul>
      </>
    </AppLayout>
  );
};

export default ProfilePage;

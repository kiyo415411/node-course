try {
  // try 之中發生任何錯誤將會立即跳入 catch
  // try 若毫無錯誤則完全不跳入 catch
  console.log("try");
} catch (err) {
  console.error(err);
} finally {
  // try與catch之後，無論有錯無錯，一定執行 finally
}

<script setup lang="ts">
const formValue = ref({
  firstName: '',
  secondName: '',
  thirdName: '',
  birthday: '',
  birthdayLunar: '',
  recentYear: '',
  phone: '',
  tel: '',
  email: '',
  username: '',
  account: '',
  organization: '',
  company: '',
  idCard: '',
  employeeId: '',
  phrase: '',
  common: '123,888,666,000,111,aaa,abc,qaz,qwe,asd,zxc,!@#,1234,1qaz,qwer,asdf,zxcv,!@#$,1357,2468,0123,6789,6666,8888,12345,123456',
  minLength: 8,
  maxLength: 21,
  separator: '',
  separatorLeft: false,
  separatorMiddle: false,
  separatorRight: false,
  camelCase: true,
  lowerCase: true,
  upperCase: true,
  excludeFullNumber: false,
  excludeFullLetter: false,
})

const get_repeat = (l: string[], x: number = 3) => {
  const lr = l.map(i => (i.length > 0 && i.length <= x) ? i + i : '');
  return l.concat(lr).filter(Boolean);
}

const get_head_tail = (s: string, ...l: number[]) => {
  return [s].concat(l.map(i => s.length > i ? [s.substring(0, i), s.substring(s.length - i)] : []).reduce((a, b) => a.concat(b))).filter(Boolean);
}

const get_distinct_list = (l: any[]) => {
  return Array.from(new Set(l)).filter(Boolean);
}

const permutations = (arr: any[], size: number) => {
  let result: any[] = [];

  const _combine = (selected: string[], arr: any[], size: number) => {
    if (size === 0) {
      result.push(selected);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      let temp = selected.slice();
      temp.push(arr[i]);
      _combine(temp, arr.slice(0, i).concat(arr.slice(i + 1)), size - 1);
    }
  }
  _combine([], arr, size);
  return result;
}

const calc_descartes = (array: any[]) => {
  if (array.length < 2) return array[0] || [];
  return array.reduce((total, currentValue) => {
    let res: any[][] = [];
    total.forEach((t: any) => {
      currentValue.forEach((cv: any) => {
        res.push([t, cv]);
      })
    })
    return res;
  })
}

const drop_short_long = (l: string[], start = 8, end = 21) => {
  return l.filter(i => ((start ? i.length >= start : true) && (end ? i.length <= end : true)));
}

const drop_string_int = (l: string[], rtype: string) => {
  if (['str', 'int'].indexOf(rtype) < 0) {
    return l;
  }
  const pattern = rtype === 'str' ? /^[a-zA-Z]*$/ : /^[0-9]*$/;
  return l.filter(i => !pattern.test(i));
}

const get_capitalize = (l: string[]) => {
  const capitalizePattern = new RegExp("^[a-z].*");
  return l.concat(l.map(i => capitalizePattern.test(i) ? i.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) : '')).filter(Boolean);
}

const get_lower = (l: string[]) => {
  const lowerPattern = new RegExp(".*[A-Z].*");
  return l.concat(l.map(i => lowerPattern.test(i) ? i.toLowerCase() : '')).filter(Boolean);
}

const get_upper = (l: string[]) => {
  const upperPattern = new RegExp(".*[a-z].*");
  return l.concat(l.map(i => upperPattern.test(i) ? i.toUpperCase() : '')).filter(Boolean);
}

const generate = () => {
  let {
    firstName,
    secondName,
    thirdName,
    birthday,
    birthdayLunar,
    recentYear,
    phone,
    tel,
    email,
    username,
    account,
    organization,
    company,
    idCard,
    employeeId,
    phrase,
    common,
    minLength,
    maxLength,
    separator,
    separatorLeft,
    separatorMiddle,
    separatorRight,
    camelCase,
    lowerCase,
    upperCase,
    excludeFullNumber,
    excludeFullLetter,
  } = formValue.value

  const firstNameCombine = /^[a-zA-Z0-9]+$/.test(firstName) ? get_repeat([firstName], 3) : ['']
  const lastNameCombine = /^[a-zA-Z0-9]+$/.test(secondName + thirdName) ? get_repeat([secondName + thirdName], 3) : ['']
  let list_name = [firstNameCombine[0] + lastNameCombine[0], lastNameCombine[0] + firstNameCombine[0]]
  const lastNameAB = secondName.substring(0, 1) + thirdName.substring(0, 1)
  list_name = list_name.concat([firstName.substring(0, 1) + lastNameAB, firstNameCombine[0] + lastNameAB, lastNameAB + firstName.substring(0, 1), lastNameAB + firstNameCombine[0], firstName.substring(0, 1) + secondName + thirdName, secondName + thirdName + firstName])
  list_name = list_name.concat(get_repeat(get_head_tail(username, 3, 4)).concat(get_repeat(get_head_tail(account, 3, 4))))
  list_name = get_distinct_list(list_name)

  let list_birthday: any[] = []
  let birth = birthday.replaceAll('-', '')
  let birthLunar = birthdayLunar.replaceAll('-', '')
  list_birthday = list_birthday.concat(get_head_tail(birth, 4)).concat(get_head_tail(birthLunar, 4))
  list_birthday = list_birthday.concat(birth.substring(4, 5) === '0' ? [birth.substring(5, 8), birth.substring(5, 8) + birth.substring(5, 8)] : []);
  list_birthday = list_birthday.concat(birthLunar.substring(4, 5) === '0' ? [birthLunar.substring(5, 8), birthLunar.substring(5, 8) + birthLunar.substring(5, 8)] : []);
  list_birthday = get_distinct_list(list_birthday);

  const list_email = get_distinct_list([email].concat(get_repeat(get_head_tail(email.split('@')[0], 3, 4), 3)));
  const list_phone = get_distinct_list(get_repeat(get_head_tail(phone, 3, 4, 5, 6)).concat(get_repeat(get_head_tail(tel, 3, 4, 5, 6))));
  const list_idCard = idCard.length > 0 ? get_distinct_list(get_repeat(get_head_tail(idCard, 3, 4, 6, 8).concat(get_head_tail(idCard.substring(0, idCard.length - 1), 3, 4, 6, 8).slice(1)))) : [];
  const list_employeeId = get_distinct_list(get_repeat(get_head_tail(employeeId, 3, 4, 6, 8)));
  const list_org = get_distinct_list([organization, company].map(i => get_repeat(get_head_tail(i, 3, 4))).reduce((a, b) => a.concat(b)));
  const list_phrase = get_distinct_list(phrase.split(',').map(i => get_repeat(get_head_tail(i, 3, 4))).reduce((a, b) => a.concat(b)));
  let list_common = common.split(/[,，]/)
  if (recentYear) {
    Array.from(Array(parseInt(recentYear)), (el, i) => list_common.push((new Date().getFullYear() - parseInt(recentYear) + i).toString()));
  }

  let allPasswordList = [list_name, list_birthday, list_email, list_phone, list_idCard, list_employeeId, list_org, list_phrase, list_common]
  let singlePasswordList = allPasswordList.reduce((a, b) => a.concat(b))
  let doublePasswordList: any[] = []
  let triplePasswordList: any[] = []

  permutations(allPasswordList, 2).forEach(passArr => {
    let pass_combine = calc_descartes(passArr)
    doublePasswordList = doublePasswordList.concat(pass_combine.map((p: any[]) => p[0] + p[1]))
    pass_combine.forEach((p: any[]) => {
      separator.split('').forEach((c: any) => {
        if (separatorLeft) {
          triplePasswordList.push(c + p[0] + p[1]);
        }
        if (separatorMiddle) {
          triplePasswordList.push(p[0] + c + p[1]);
        }
        if (separatorRight) {
          triplePasswordList.push(p[0] + p[1] + c);
        }
      });
    })
  })

  let fullPasswordList = [singlePasswordList, doublePasswordList, triplePasswordList]
  fullPasswordList = fullPasswordList.map(i => drop_short_long(i, minLength, maxLength))
  if (excludeFullNumber) {
    fullPasswordList = fullPasswordList.map(i => drop_string_int(i, 'int'));
  }
  if (excludeFullLetter) {
    fullPasswordList = fullPasswordList.map(i => drop_string_int(i, 'str'));
  }
  if (camelCase) {
    fullPasswordList = fullPasswordList.map(i => get_capitalize(i));
  }
  if (lowerCase) {
    fullPasswordList = fullPasswordList.map(i => get_lower(i));
  }
  if (upperCase) {
    fullPasswordList = fullPasswordList.map(i => get_upper(i));
  }
  fullPasswordList = fullPasswordList.map(i => get_distinct_list(i));
  return fullPasswordList;
}

const handleGenerate = () => {
  console.log(generate())
}

const handleDownload = () => {
  let result = generate()
  result = result.flat()
  console.log(result)

  const ele = document.createElement('a')
  ele.download = "SocialPasswords.txt"
  ele.style.display = "none";

  const blob = new Blob([result.join("\n")])
  ele.href = URL.createObjectURL(blob)
  document.body.appendChild(ele)
  ele.click();
  document.body.removeChild(ele)
}
</script>

<template>
  <ToolContainer>
    <UAlert
        class="mb-4"
        icon="i-tabler-clipboard-text"
        title="所有项目都是选填，将已有的信息全部填入即可，尽量减少无效输入"
    />
    <UAlert
        class="mb-4"
        icon="i-solar-shield-minimalistic-bold-duotone"
        color="primary"
        variant="subtle"
        title="不用担心"
        description="你的数据是安全的，所有数据均在本地处理，不会被发送到任何服务器上，也不会访问任何外部资源"
    />
    <div class="flex flex-col gap-8 md:gap-4">
      <UDivider label="基本信息"/>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.firstName" placeholder="姓氏拼音或英文" label="姓氏(英文)"/>
        <UniInput v-model="formValue.secondName" placeholder="名的第一个字" label="名第一位(英文)"/>
        <UniInput v-model="formValue.thirdName" placeholder="名的第二个字(如果有)" label="名第二位(英文)"/>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.birthday" label="生日" type="date"/>
        <UniInput v-model="formValue.birthdayLunar" label="生日(农历/备选)" type="date"/>
        <UniInput v-model="formValue.recentYear" label="最近年份" placeholder="倒推一定量的年份" type="number"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.phone" placeholder="请输入手机号码" label="手机号"/>
        <UniInput v-model="formValue.tel" placeholder="请输入座机号码(不需要短横线)" label="座机号"/>
        <UniInput v-model="formValue.email" label="邮箱" placeholder="请输入邮箱" type="email"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.username" placeholder="常用的用户名(英文)" label="用户名"/>
        <UniInput v-model="formValue.account" placeholder="例如QQ号等" label="用户账号"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.organization" placeholder="请输入组织名英文" label="组织名"/>
        <UniInput v-model="formValue.company" placeholder="请输入公司名英文" label="公司名"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.idCard" label="身份证号" placeholder="请输入身份证号"/>
        <UniInput v-model="formValue.employeeId" label="工号" placeholder="请输入工号/学号"/>
      </div>

      <UDivider label="习惯信息"/>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.phrase" placeholder="请输入短语(英文),多个用逗号分隔,如: iloveyou,bingo"
                  label="常用短语" class="md:col-span-2"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.common" placeholder="请输入常用词组,多个用逗号分隔" label="常用词组"
                  class="md:col-span-2"/>
      </div>

      <UDivider label="生成规则"/>

      <div class="grid grid-cols-3">
        <div class="flex items-center gap-2 col-span-3 md:col-span-2">
          <UniInput v-model="formValue.minLength" label="密码长度不小于" type="number" class="flex-1"/>
          <UniInput v-model="formValue.maxLength" label="密码长度不大于" type="number" class="flex-1"/>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UniInput v-model="formValue.separator" placeholder="请输入连接符(如.!_-#@),过多的连接符会大幅增加密码数量"
                  label="连接符" class="md:col-span-2"/>
        <div class="col-span-2 flex gap-2">
          <div class="flex items-center gap-2">
            <span>左</span>
            <UniToggle v-model="formValue.separatorLeft" size="sm"/>
          </div>
          <div class="flex items-center gap-2">
            <span>中</span>
            <UniToggle v-model="formValue.separatorMiddle" size="sm"/>
          </div>
          <div class="flex items-center gap-2">
            <span>右</span>
            <UniToggle v-model="formValue.separatorRight" size="sm"/>
          </div>
        </div>
      </div>
      <div class="col-span-2 flex gap-2">
        <div class="flex items-center gap-2">
          <span>首字母大写</span>
          <UniToggle v-model="formValue.camelCase" size="sm"/>
        </div>
        <div class="flex items-center gap-2">
          <span>全小写</span>
          <UniToggle v-model="formValue.lowerCase" size="sm"/>
        </div>
        <div class="flex items-center gap-2">
          <span>全大写</span>
          <UniToggle v-model="formValue.upperCase" size="sm"/>
        </div>
      </div>
      <div class="col-span-2 flex gap-2">
        <div class="flex items-center gap-2">
          <span>排除纯数字</span>
          <UniToggle v-model="formValue.excludeFullNumber" size="sm"/>
        </div>
        <div class="flex items-center gap-2">
          <span>排除纯字母</span>
          <UniToggle v-model="formValue.excludeFullLetter" size="sm"/>
        </div>
      </div>

      <UDivider label="操作"/>

      <div class="flex flex-row gap-4">
        <UniButton type="primary" @click="handleDownload">生成并下载</UniButton>
        <UniButton disabled @click="handleGenerate">生成并查看</UniButton>
      </div>
    </div>
  </ToolContainer>
</template>

<style scoped>
</style>